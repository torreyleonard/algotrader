const Robinhood = require('./Robinhood');
const Instrument = require('./Instrument');
const Portfolio = require('./Portfolio');

const request = require('request');
const fs = require('fs');
const async = require('async');
const path = require('path');

/**
 * Represents the user that is logged in while accessing the Robinhood API.
 */
class User extends Robinhood {

	/**
	 * Creates a new User object.
	 * @param {String} username
	 * @param {String} password
	 */
	constructor(username, password) {
		super();
		this.username = username;
		this.password = password;
		this.token = null; // Authentication token
		this.account = null; // Account number
	}

	/**
	 * Authenticates a user using the inputted username and password.
	 * @returns {Promise}
	 */
	authenticate() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request.post({
				uri: _this.url + "/api-token-auth/",
				form: {
					username: _this.username,
					password: _this.password
				}
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new Error(body));
				else {
					_this.token = JSON.parse(body).token;
					_this.getAccount().then(account => {
						_this.account = account.account_number;
						resolve(true);
					}).catch(error => reject(error));
				}
			})
		})
	}

	// GET

	getAuthToken() {
		return this.token;
	}

	getAccountNumber() {
		return this.account;
	}

	getUsername() {
		return this.username;
	}

	/**
	 * Returns vital information about balances and enabled features.
	 * @returns {Promise}
	 */
	getAccount() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/accounts/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns information like username, first / last name, creation date, id, and more.
	 * @returns {Promise<Object>}
	 */
	getUserInfo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns information like address, citizenship, SSN, date of birth, and more.
	 * @returns {Promise<Object>}
	 */
	getTaxInfo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/basic_info/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns information on the user pertaining to SEC rule 405.
	 * @returns {Promise<Object>}
	 */
	getDisclosureInfo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/additional_info/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns information on the user's employment.
	 * @returns {Promise<Object>}
	 */
	getEmployerInfo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/employment/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns the user's answers to basic questions regarding investment experiences.
	 * @returns {Promise<Object>}
	 */
	getInvestmentProfile() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/user/investment_profile/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns arrays of recent option and equity day trades.
	 * @returns {Promise<Object>}
	 */
	getRecentDayTrades() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/accounts/" + _this.account + "/recent_day_trades/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Returns a Portfolio object containing all open positions in a user's portfolio.
	 * @returns {Promise<Object>}
	 */
	getPortfolio() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/accounts/" + _this.account + "/positions/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, _this.token, res => {
					let array = [];
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
						resolve(new Portfolio(array));
					} );
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
	// 				'Authorization': 'Token ' + _this.token
	// 			}
	// 		}, (error, response, body) => {
	// 			return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
	// 		})
	// 	})
	// }

	// BANKING

	/**
	 * Returns an object representing the user's linked bank account. If the user has linked multiple, this returns an array.
	 * @returns {Promise<Object>}
	 */
	getLinkedBanks() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/ach/relationships/",
				headers: {
					'Authorization': 'Token ' + _this.token
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.token, resolve, reject);
			})
		})
	}

	/**
	 * Deposits money into the user's account. If frequency is not empty, this becomes an automatic deposit.
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
						'Authorization': 'Token ' + _this.token
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
	 * @returns {Promise<Array>}
	 */
	getDocuments() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + /documents/,
				headers: {
					'Authorization': 'Token ' + _this.token
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
								'Authorization': 'Token ' + _this.token
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