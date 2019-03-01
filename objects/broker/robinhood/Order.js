const LibraryError = require('../../globals/LibraryError');
const Robinhood = require('./Robinhood');
const request = require('request');
const async = require('async');

/**
 * Represents and executes an order for the given instrument.
 */
class Order extends Robinhood {

	/**
	 * Creates a new Order object.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @constructor
	 * @param {User} user
	 * @param {Object} object
	 * @property {Instrument} instrument
	 * @property {Quote} quote
	 * @property {String} type - 'limit' | 'market
	 * @property {String} timeInForce - 'gfd' | 'gtc' | 'ioc' | 'opg'
	 * @property {String} trigger - 'immediate' | 'stop'
	 * @property {Number|Null} stopPrice - If trigger is 'stop,' this must be specified. If not, this should be null.
	 * @property {Number} quantity
	 * @property {String} side - 'buy' | 'sell'
	 * @property {Boolean} extendedHours - Whether the order should be allowed to execute when exchanges are closed (9-9:30 AM, 4-6 PM)
	 * @property {Boolean} overrideDayTradeCheck - Whether to override Pattern Day Trader protection.
	 */
	constructor(user, object) {
		super();
		this.user = user;
		if (object.created_at) {
			this.response = this._parse(object);
			this.executed = true;
		} else this.order = object;
	}

	/**
	 * Parse an executed order.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @private
	 */
	_parse(object) {
		return {
			executions: new Array(object.executions),
			timeInForce: String(object.time_in_force),
			fees: Number(object.fees),
			id: String(object.id),
			quantity: Number(object.quantity),
			averagePrice: Number(object.average_price),
			cumulativeQuantity: Number(object.cumulative_quantity),
			stopPrice: Number(object.stop_price),
			rejectReason: String(object.reject_reason),
			state: String(object.state),
			trigger: String(object.trigger),
			type: String(object.type),
			overrideDayTradeCheck: Boolean(object.override_dtbp_checks),
			price: Number(object.price),
			clientID: String(object.client_id),
			extendedHours: Boolean(object.extended_hours),
			side: String(object.side),
			dates: {
				created: new Date(object.created_at),
				lastTransaction: new Date(object.last_transaction_at),
				updated: new Date(object.updated_at)
			},
			urls: {
				cancel: String(object.cancel),
				instrument: String(object.instrument),
				account: String(object.account),
				order: String(object.url),
				position: String(object.position)
			}
		}
	}

	/**
	 * Submits an order to Robinhood to be executed by the exchange.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	submit() {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (_this.executed) reject(new Error("Order has already been executed."));
			else request.post({
				uri: _this.url + "/orders/",
				headers: {
					'Authorization': 'Bearer ' + _this.user.getAuthToken()
				},
				form: {
					account: _this.url + "/accounts/" + _this.user.getAccountNumber() + "/",
					instrument: _this.order.instrument.urls.instrument,
					symbol: _this.order.instrument.getSymbol(),
					type: _this.order.type,
					time_in_force: _this.order.timeInForce,
					trigger: _this.order.trigger,
					price: (_this.order.quote.getLast()).toFixed(2),
					stop_price: _this.order.stopPrice,
					quantity: _this.order.quantity,
					side: _this.order.side,
					extendedHours: _this.order.extendedHours,
					override_day_trade_checks: _this.order.overrideDayTradeCheck,
					override_dtbp_checks: _this.order.overrideDayTradeCheck
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.user.getAuthToken(), res => {
					if (res.detail !== undefined || res.reject_reason !== null) reject(new LibraryError(res));
					else {
						_this.executed = true;
						_this.response = this._parse(res);
						resolve(res);
					}
				}, reject);
			})
		})
	}

	/**
	 * Attempts to cancel an order.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	cancel() {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (!_this.executed) reject(new Error("Order has not yet been executed."));
			else if (_this.response.urls.cancel === null) reject(new Error("Order has been executed and cannot be cancelled."));
			else {
				request.post({
					uri: _this.response.urls.cancel,
					headers: {
						'Authorization': 'Bearer ' + _this.user.getAuthToken()
					}
				}, (error, response, body) => {
					return Robinhood.handleResponse(error, response, body, _this.user.getAuthToken(), resolve, reject);
				})
			}
		})
	}

	/**
	 * Returns a new order object for the specified order ID, if found.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {User} user
	 * @param {String} orderID
	 * @returns {Promise<Order>}
	 */
	static getByOrderID(user, orderID) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/orders/" + orderID + "/",
				headers: {
					'Authorization': 'Bearer ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					resolve(new Order(user, res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an array of recent orders for the given user object.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {User} user
	 * @returns {Promise<Array>}
	 */
	static getRecentOrders(user) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/orders/",
				headers: {
					'Authorization': 'Bearer ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					let array = [];
					res.forEach(o => {
						if (!Array.isArray(o)) array.push(new Order(user, o));
						else o.forEach(o2 => {
							array.push(new Order(user, o2));
						})
					});
					resolve(array);
				}, reject);
			})
		})
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param user
	 * @returns {Promise<any>}
	 */
	static cancelOpenOrders(user) {
		return new Promise((resolve, reject) => {
			Order.getRecentOrders(user).then(array => {
				async.forEachOf(array, (order, key, callback) => {
					if (order.response.urls.cancel !== 'null') {
						order.cancel().then(() => {
							callback();
						}).catch(error => { reject(error) });
					} else callback();
				}, () => {
					resolve();
				})
			}).catch(error => reject(error));
		})
	}

	/**
	 * If an order has been executed, this will return the response object.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Object|Null}
	 */
	getResponse() {
		if (this.executed === true) return this.response;
		else return null;
	}

}

module.exports = Order;