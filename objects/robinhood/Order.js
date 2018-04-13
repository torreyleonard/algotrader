const Robinhood = require('./Robinhood');
const User = require('./User');
const Instrument = require('./Instrument');
const Quote = require('./Quote');
const request = require('request');

class Order extends Robinhood {

	/**
	 * Creates a new Order object.
	 * @param {Object|Null} object - Object for previously created order. If this is a new order, this should be null.
	 * @param {User} user
	 * @param {Instrument} instrument
	 * @param {Quote} quote
	 * @param {String} type - 'limit' / 'market'
	 * @param {String} timeInForce - 'GFD' / 'GTC' / 'IOC' / 'OPG'
	 * @param {String} trigger - 'immediate' / 'stop'
	 * @param {Number|Null} stopPrice - If trigger is 'stop,' this must be specified. If not, this should be null.
	 * @param {int} quantity
	 * @param {String} side - 'buy' / 'sell'
	 * @param {Boolean} extendedHours - Whether the order should be allowed to execute when exchanges are closed.
	 * @param {Boolean} overrideDayTradeCheck - Whether to override Pattern Day Trader protection.
	 */
	constructor(object, user, instrument, quote, type, timeInForce, trigger, stopPrice, quantity, side, extendedHours, overrideDayTradeCheck) {
		super();
		if (object === null) {
			if (!user instanceof User) new Error("Parameter 'user' must be a User object.");
			else if (!quote instanceof Quote) new Error("Parameter 'quote' must be a Quote object.");
			else if (!instrument instanceof Instrument) new Error("Parameter 'user' must be an Instrument object.");
			else if (!type instanceof String) new Error("Parameter 'type' must be a string.");
			else if (!timeInForce instanceof String) new Error("Parameter 'timeInForce' must be a string.");
			else if (!trigger instanceof String) new Error("Parameter 'trigger' must be a string.");
			else if ((trigger === "stop" && !stopPrice instanceof Number) || (trigger === "immediate" && stopPrice !== null))
				new Error("Parameter 'stopPrice' must be a string if trigger = stop, otherwise it should be null.");
			else if (!type instanceof String) new Error("Parameter 'type' must be a string.");
			else if (!Number.isInteger(quantity)) new Error("Parameter 'type' must be a string.");
			else if (!side instanceof String) new Error("Parameter 'side' must be a string.");
			else if (!extendedHours instanceof Boolean) new Error("Parameter 'extendedHours' must be a boolean.");
			else if (!overrideDayTradeCheck instanceof Boolean) new Error("Parameter 'overrideDayTradeCheck' must be a boolean.");
			else if (["limit", "market"].indexOf(type) === -1) new Error("Parameter 'type' must be either 'limit' or 'market.'");
			else if (["GFD", "GTC", "IOC", "OPG"].indexOf(timeInForce) === -1) new Error("Parameter 'timeInForce' must be 'GFD,' 'GTC,' 'IOC,' or 'OPG.'");
			else if (["immediate", "stop"].indexOf(trigger) === -1) new Error("Parameter 'trigger' must be either 'immediate' or 'stop.'");
			else if (["buy", "sell"].indexOf(side) === -1) new Error("Parameter 'side' must be either 'buy' or 'sell.'");
			else {
				this.User = user;
				this.Instrument = instrument;
				this.Quote = quote;
				this.type = type;
				this.timeInForce = timeInForce;
				this.trigger = trigger;
				this.stopPrice = stopPrice;
				this.quantity = quantity;
				this.side = side;
				this.extendedHours = extendedHours;
				this.overrideDayTradeCheck = overrideDayTradeCheck;
				this.executed = false;
				this.response = null;
			}
		} else {
			this.executed = true;
			this.response = this.parse(object);
		}
	}

	/**
	 * @private
	 * @param object
	 * @returns {{executions: Array, timeInForce: string, fees: number, id: string, quantity: number, averagePrice: number, cumulativeQuantity: number, stopPrice: number, rejectReason: string, state: string, trigger: string, type: string, overrideDayTradeCheck: boolean, price: number, clientID: string, extendedHours: boolean, side: string, dates: {created: Date, lastTransaction: Date, updated: Date}, urls: {cancel: string, instrument: string, account: string, order: string, position: string}}}
	 */
	parse(object) {
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
	 * @returns {Promise<Object>}
	 */
	submit() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request.post({
				uri: _this.url + "/orders/",
				headers: {
					'Authorization': 'Token ' + _this.User.getAuthToken()
				},
				form: {
					account: _this.url + "/accounts/" + _this.User.getAccountNumber() + "/",
					instrument: _this.Instrument.urls.instrument,
					symbol: _this.Instrument.getSymbol(),
					type: _this.type,
					time_in_force: _this.timeInForce,
					trigger: _this.trigger,
					price: _this.Quote.getLast(),
					stop_price: _this.stopPrice,
					quantity: _this.quantity,
					side: _this.side,
					extendedHours: _this.extendedHours,
					override_day_trade_checks: _this.overrideDayTradeCheck,
					override_dtbp_checks: _this.overrideDayTradeCheck
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, _this.User.getAuthToken(), res => {
					_this.executed = true;
					_this.response = this.parse(res);
					resolve(res);
				}, reject);
			})
		})
	}

	/**
	 * Returns a new order object for the specified order ID, if found.
	 * @param {User} user
	 * @param {String} orderID
	 * @returns {Promise<Order>}
	 */
	static getByOrderID(user, orderID) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/orders/" + orderID + "/",
				headers: {
					'Authorization': 'Token ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					resolve(new Order(res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an array of recent orders for the given user object.
	 * @param {User} user
	 * @returns {Promise<Array>}
	 */
	static getRecentOrders(user) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/orders/",
				headers: {
					'Authorization': 'Token ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					let array = [];
					res.forEach(o => {
						array.push(new Order(o));
					});
					resolve(array);
				}, reject);
			})
		})
	}

	/**
	 * If an order has been executed, this will return the response object.
	 * @returns {Object|Null}
	 */
	getResponse() {
		if (this.executed === true) return this.response;
		else return null;
	}

}

module.exports = Order;