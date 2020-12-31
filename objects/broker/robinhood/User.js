const LibraryError = require('../../globals/LibraryError');
const Robinhood = require('./Robinhood');
const Instrument = require('./Instrument');
const Portfolio = require('./Portfolio');
const Order = require('./Order');
const OptionOrder = require('./OptionOrder');
const OptionInstrument = require('./OptionInstrument');

const request = require('request');
const async = require('async');
const path = require('path');
const prompt = require('prompt');
const moment = require('moment');

/**
 * Represents the user that is logged in while accessing the Robinhood API.
 */
class User extends Robinhood {

	/**
	 * Creates a new User object.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} username
	 * @param {String} password - Optional. If not provided the user will be prompted via CLI.
	 * @param {String} deviceToken
	 */
	constructor(username, password, deviceToken = 'ea9fa5c6-01e0-46c9-8430-5b422c99bd16') {
		super();
		this.username = username;
		this.password = password;
		this.token = null; // Authentication token
		this.deviceToken = deviceToken;
		this.account = null; // Account number
		this.expires = null; // Auth expiration date (24 hours after login)
		this.refreshToken = null; // Refresh token can be used to obtain another access token after auth expiration
	}

	/**
	 * Authenticates a user using the inputted username and password.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String|Undefined} password - Optional if not provided in constructor or re-authenticating a saved user.
	 * @param {Function|Undefined} mfaFunction - Optional function that is called when prompted for multi-factor authentication. Must return a promise with a six-character string. If not provided the CLI will be prompted.
	 * @returns {Promise<User>}
	 */
	authenticate(password, mfaFunction) {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (_this.password === undefined && password === undefined) {
				console.log("You didn't include a password in the constructor of your Robinhood user or when calling the authenticate function and it is required to authenticate your account.");
				prompt.get({
					properties: {
						password: {
							required: true,
							hidden: true
						}
					}
				}, (error, result) => {
					_this.password = result.password;
					_preAuth(resolve, reject);
				})
			} else _preAuth(resolve, reject);
		});
		function _preAuth(resolve, reject) {
			if (_this.password === undefined)
				_this.password = password;
			request.post({
				uri: _this.url + "/oauth2/token/",
				form: {
					username: _this.username,
					password: _this.password,
					client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
					device_token: _this.deviceToken,
					grant_type: 'password',
					scope: 'internal'
				}
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else {
					const json = JSON.parse(body);
					if (json.mfa_required) {
						if (mfaFunction !== undefined) {
							console.log("Multi-factor authentication detected. Executing the provided function...");
							mfaFunction()
								.then(mfa => {
									if (!mfa instanceof String) reject(new Error("The provided function did not return a string after the promise resolved."));
									else if (mfa.length !== 6) reject(new Error("The provided function returned a string, but it is not six-characters in length."));
									else _sendMFA(mfa, resolve, reject);
								})
								.catch(error => {
									console.log("An error occurred while executing the provided MFA function.");
									reject(error);
								})
						} else {
							console.log("Multi-factor authentication detected. Please enter your six-digit code below:");
							console.log(" - This can be entered programmatically by passing a function when authenticating. See documentation for more.");
							prompt.get({
								properties: {
									code: {
										pattern: /^[0-9]{6}$/,
										message: "Your Robinhood code will most likely be texted to you and should only contain 6 integers.",
										required: true
									}
								}
							}, (error, mfaCode) => {
								_sendMFA(mfaCode.code, resolve, reject);
							})
						}
					} else _postAuth(json, resolve, reject);
				}
			})
		}
		function _sendMFA(mfaCode, resolve, reject) {
			request.post({
				uri: _this.url + '/oauth2/token/',
				form: {
					username: _this.username,
					password: _this.password,
					client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
					device_token: _this.deviceToken,
					grant_type: 'password',
					scope: 'internal',
					mfa_code: mfaCode,
				}
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else _postAuth(JSON.parse(body), resolve, reject);
			})
		}
		function _postAuth(json, resolve, reject) {
			_this.expires = moment().add(json.expires_in, 'seconds');
			_this.token = json.access_token;
			_this.refreshToken = json.refresh_token;
			_this.getAccount().then(account => {
				_this.account = account.account_number;
				delete _this.password;
				resolve(_this);
			}).catch(error => reject(error));
		}
	}

	/**
	 * Re-authenticates a user with the the expired authentication token using the refresh token.
	 * @author Egor Verbitskiy <https://github.com/egorio>
	 * @returns {Promise<User>}
	 */
	reauthenticate(refreshToken) {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (_this.refreshToken === undefined && refreshToken === undefined) {
				console.log("A refresh token is not provided.");
			} else {
				if (_this.refreshToken === undefined) {
					_this.refreshToken = refreshToken;
				}
				request.post({
					uri: _this.url + "/oauth2/token/",
					form: {
						refresh_token: _this.refreshToken,
						client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
						grant_type: 'refresh_token',
						scope: 'internal'
					}
				}, (error, response, body) => {
					if (error) reject(error);
					else if (response.statusCode !== 200) reject(new LibraryError(body));

					const json = JSON.parse(body);

					_this.expires = moment().add(json.expires_in, 'seconds');
					_this.token = json.access_token;
					_this.refreshToken = json.refresh_token;
					_this.getAccount().then(account => {
						_this.account = account.account_number;
						delete _this.password;
						resolve(_this);
					}).catch(error => reject(error));
				})
			}
		});
	}

	/**
	 * Logout the user by expiring the authentication token and removing any saved data.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Boolean>}
	 */
	logout() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request.post({
				uri: _this.url + "/api-token-logout/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else {
					resolve(true);
				}
			})
		})
	}

	/**
	 * Converts a user object to a string to be securely stored.
	 *
	 * Note that serialized object contains refreshToken and it's subject to strict storage requirements
	 * to ensure that they are not leaked
	 *
	 * @author Egor Verbitskiy <https://github.com/egorio>
	 * @returns {string}
	 */
	serialize() {
		return JSON.stringify(this)
	}

	/**
	 * Restores a user from the serialized object.
	 * @author Egor Verbitskiy <https://github.com/egorio>
	 * @param {String} data - serialized data
	 * @returns {Promise<User>}
	 */
	static deserialize(data) {
		return new Promise((resolve, reject) => {
			const json = JSON.parse(data);

			if (json === null || json.username === undefined) {
				reject(new Error("Provided data doesn't have a username"));
			} else {
				const json = JSON.parse(data);

				const u = new User(json.username, json.password);

				u.token = json.token;
				u.account = json.account;
				u.expires = json.expires;
				u.refreshToken = json.refreshToken;
				resolve(u);
			}
		});
	}

	/**
	 * Save the user to disk. Prevents having to login and logout each run.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Boolean>}
	 */
	save() {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (!_this.isAuthenticated()) reject(new Error('You cannot save an unauthenticated user!'));
			else {
				delete _this.refreshToken; // It's not secure to store refreshToken locally
				const serializedUser = _this.serialize();
				// We return the user so the consumer can decide how to store the serialized user
				resolve(serializedUser);
				return;
			}
		})
	}

	/**
	 * If a saved user exists, this will load it into system memory. Recommended if using multi-factor authentication.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<User>}
	 */
	static load(serializedUser) {
		return new Promise((resolve, reject) => {
			const _load = (data) => {
				this.deserialize(data)
						.then(user => {
							if (moment().isBefore(user.expires)) {
								resolve(user);
							} else {
								reject(new Error("User session has expired. Please authenticate again."))
							}
						})
						.catch(error => reject(error));
			}
			_load(serializedUser);
		})
	}

	/**
	 * Checks if the provided object an instance of User object.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {Object} object
	 * @returns {boolean}
	 */
	static isUser(object) {
		return object instanceof this.constructor;
	}

	// GET

	/**
	 * Checks if the current user is authenticated and authentication is not expired.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {boolean}
	 */
	isAuthenticated() {
		return this.token !== undefined && moment().isBefore(this.expires);
	}

	/**
	 * Returns an auth token.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {null|string}
	 */
	getAuthToken() {
		return this.token;
	}

	/**
	 * Returns an account number.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {null|string}
	 */
	getAccountNumber() {
		return this.account;
	}

	/**
	 * Returns a username.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {null|string}
	 */
	getUsername() {
		return this.username;
	}

	/**
	 * Returns vital information about balances and enabled features.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise}
	 */
	getAccount() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/accounts/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns an object containing details on the user's cash and margin balance.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getBalances() {
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.getAccount().then(res => {
				resolve({
					unsettledFunds: res.unsettled_funds,
					unsettledDebit: res.unsettled_debit,
					unclearedDeposits: res.uncleared_deposits,
					smaHeldForOrders: res.sma_held_for_orders,
					cash: res.cash,
					cashHeldForOrders: res.cash_held_for_orders,
					cashAvailableForWithdraw: res.cash_available_for_withdraw,
					buyingPower: res.buying_power,
					sma: res.sma,
					accountType: res.type,
					margin: {
						goldEquityRequirement: res.margin_balances.gold_equity_requirement,
						outstandingInterest: res.margin_balances.outstanding_interest,
						cashHeldForOptionsCollateral: res.margin_balances.cash_held_for_options_collateral,
						dayTradeBuyingPower: res.margin_balances.day_trade_buying_power,
						unallocatedMarginCash: res.margin_balances.unallocated_margin_cash,
						startOfDayOvernightBuyingPower: res.margin_balances.start_of_day_overnight_buying_power,
						marginLimit: res.margin_balances.margin_limit,
						overnightBuyingPower: res.margin_balances.overnight_buying_power,
						startOfDayDtbp: res.margin_balances.start_of_day_dtbp,
						dayTradeBuyingPowerHeldForOrders: res.margin_balances.day_trade_buying_power_held_for_orders
					}
				});
			}).catch(error => reject(error));
		})
	}

	/**
	 * Returns the amount of money available to be spent.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise}
	 */
	getBuyingPower() {
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.getBalances().then(res => {
				if (res.accountType === 'margin') {
					resolve(Number(res.margin.unallocatedMarginCash));
				} else {
					resolve(Number(res.buyingPower));
				}
			}).catch(error => reject(error));
		})
	}

	/**
	 * Returns information like username, first / last name, creation date, id, and more.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getUserInfo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns the user's unique ID.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<String>}
	 */
	getUID() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/id/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, res => {
					resolve(res.id);
				}, reject);
			})
		})
	}

	/**
	 * Returns information like address, citizenship, SSN, date of birth, and more.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getTaxInfo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/basic_info/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns information on the user pertaining to SEC rule 405.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getDisclosureInfo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/additional_info/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns information on the user's employment.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getEmployerInfo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/employment/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns the user's answers to basic questions regarding investment experiences.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getInvestmentProfile() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/investment_profile/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns arrays of recent option and equity day trades.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getRecentDayTrades() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/accounts/" + _this.account + "/recent_day_trades/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns an array of recent orders.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Order[]>}
	 */
	getRecentOrders() {
		return Order.getRecentOrders(this);
	}

	/**
	 * Cancels all open orders.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise}
	 */
	cancelOpenOrders() {
		return Order.cancelOpenOrders(this);
	}

	/**
	 * Returns an array of option orders.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Array>}
	 */
	getOptionOrders() {
		return OptionOrder.getOrders(this);
	}

	/**
	 * Returns a Portfolio object containing all open positions in a user's portfolio.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getPortfolio() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/positions/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				},
				qs: {
					nonzero: true
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, _this.token, res => {
					let array = [];
					
					if (!Array.isArray(res)) res = [res];
					async.forEachOf(res, (position, key, callback) => {
						position.quantity = Number(position.quantity);
						if (position.quantity !== 0) {
							Instrument.getByURL(position.instrument).then(instrument => {
								position.InstrumentObject = instrument;
								array.push(position);
								callback();
							});
						} else callback();
					}, () => {
						resolve(new Portfolio(_this, array));
					} );
				}, reject);
			})
		})
	}

	/**
	 * Returns an array of options that the user holds.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<any>}
	 */
	getOptionPositions() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/options/positions/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				},
				qs: {
					nonzero: 'True'
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, _this.token, res => {
					if (!Array.isArray(res)) res = [res];
					let array = [];
					async.forEachOf(res, (position, key, callback) => {
						OptionInstrument.getByURL(_this, position.option).then(option => {
							position.option = option;
							array.push(position);
							callback();
						}).catch(reject);
					}, () => {
						resolve(array);
					})
				}, reject);
			})
		})
	}

	/**
	 * Returns an object that can be used to create a chart, show total return, etc.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getHistoricals(span, interval) {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/portfolios/historicals/" + _this.account,
				headers: {
					'Authorization': 'Bearer ' + _this.token
				},
				qs: {
					span: span,
					interval: interval
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, _this.token, res => {
					resolve(res);
				}, reject);
			})
		})
	}

	// Invalid token?
	//
	// getNotifications() {
	// 	const _this = this;
	// 	return new Promise((resolve, reject) => {
	// 		request({
	// 			uri: _this.url + "/midlands/notifications/stack/",
	// 			headers: {
	// 				'Authorization': 'Bearer ' + _this.token
	// 			}
	// 		}, (error, response, body) => {
	// 			return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
	// 		})
	// 	})
	// }

	// BANKING

	/**
	 * Returns an object representing the user's linked bank account. If the user has linked multiple, this returns an array.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getLinkedBanks() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/ach/relationships/",
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Deposits money into the user's account. If frequency is not empty, this becomes an automatic deposit.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} bankID - This ID can be found from getLinkedBanks().
	 * @param {String} amount - How much money should be deposited, represented as a string.
	 * @param {String} frequency - Empty string if one-time deposit, otherwise: 'weekly,' 'biweekly,' 'monthly,' or 'quarterly.'
	 * @returns {Promise<Object>}
	 */
	addDeposit(bankID, amount, frequency) {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (!bankID instanceof String) reject(new Error("Parameter 'bankID' must be a string."));
			else if (!amount instanceof String) reject(new Error("Parameter 'amount' must be a string."));
			else if (!frequency instanceof String) reject(new Error("Parameter 'frequency' must be a string."));
			else if (["", "weekly", "biweekly", "monthly", "quarterly"].indexOf(frequency) === -1)
				reject(new Error("Provided frequency parameter is invalid: " + frequency + "\nValid input: empty string (one-time deposit), 'weekly,' 'biweekly,' 'monthly,' or 'quarterly.'"));
			else {
				request({
					uri: _this.url + "/ach/deposit_schedules/",
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					qs: {
						achRelationship: _this.url + "/ach/relationships/" + bankID + "/",
						amount: amount,
						frequency: frequency
					}
				}, (error, response, body) => {
					return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
				})
			}
		})
	}

	// DOCUMENTS

	/**
	 * Returns an array of account documents (taxes, statements, etc). Use 'downloadDocuments()' to view them.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Array>}
	 */
	getDocuments() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + /documents/,
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		});
	};

	/**
	 * Downloads all account documents to the given folder path.
	 * Note that, because of Robinhood's connection throttling, this will take a while for accounts with high activity.
	 * Downloads will be attempted every second and will wait for any connection throttling to end before continuing.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} folder
	 * @returns {Promise}
	 */
	downloadDocuments(folder) {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (!fs.existsSync(folder)) fs.mkdirSync(folder);
			_this.getDocuments().then(array => {
				async.eachSeries(array, (document, eachCallback) => {
					const dir = path.join(folder, document.type);
					const file = path.join(dir, document.id + ".pdf");
					if (!fs.existsSync(dir)) fs.mkdirSync(dir);
					let downloaded = false;
					async.whilst(() => { return !downloaded; }, whilstCallback => {
						let seconds = 0;
						const req = request({
							uri: document.download_url,
							headers: {
								'Authorization': 'Bearer ' + _this.token
							}
						}, (error, response, body) => {
							if (error) reject(error);
							else if (response.statusCode !== 200) {
								seconds = Number(body.split("available in ")[1].split(" seconds")[0]);
							} else downloaded = true;
						});
						req.on('end', () => {
							setTimeout(() => {
								if (seconds === 0) whilstCallback();
								else setTimeout(() => {
									whilstCallback();
								}, seconds * 1000);
							}, 1000);
						});
						req.pipe(fs.createWriteStream(file))
					}, () => {
						eachCallback();
					})
				}, () => {
					resolve();
				})
			})
		})
	}

}

module.exports = User;
