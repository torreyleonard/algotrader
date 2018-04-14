const Robinhood = require('./Robinhood');
const User = require('./User');
const request = require('request');

class OptionOrder extends Robinhood {

	/**
	 * Creates a new OptionOrder class.
	 * @param {Object|Null} object - Object for previously created order. If this is a new order, this should be null.
	 * @param {User} user
	 * @param {OptionInstrument} optionInstrument
	 * @param {String} direction - debit, credit
	 * @param {String} timeInForce - 'GFD' / 'GTC' / 'IOC' / 'OPG'
	 * @param {String} side - 'buy' / 'sell'
	 * @param {String} type - 'limit' / 'market'
	 * @param {Number} quantity
	 */
	constructor(object, user, optionInstrument, direction, timeInForce, side, type, quantity) {
		super();
		if (object === null) {
			// if (!user instanceof User) new Error("Parameter 'user' must be a User object.");
			// else if (!type instanceof String) new Error("Parameter 'type' must be a string.");
			// else if (!timeInForce instanceof String) new Error("Parameter 'timeInForce' must be a string.");
			// 	new Error("Parameter 'stopPrice' must be a string if trigger = stop, otherwise it should be null.");
			// else if (!type instanceof String) new Error("Parameter 'type' must be a string.");
			// else if (!Number.isInteger(quantity)) new Error("Parameter 'quantity' must be an integer.");
			// else if (["limit", "market"].indexOf(type) === -1) new Error("Parameter 'type' must be either 'limit' or 'market.'");
			// else if (["GFD", "GTC", "IOC", "OPG"].indexOf(timeInForce) === -1) new Error("Parameter 'timeInForce' must be 'GFD,' 'GTC,' 'IOC,' or 'OPG.'");
			// else if (["immediate", "stop"].indexOf(trigger) === -1) new Error("Parameter 'trigger' must be either 'immediate' or 'stop.'");
			// else if (["buy", "sell"].indexOf(side) === -1) new Error("Parameter 'side' must be either 'buy' or 'sell.'");
			// else {
				this.User = user;
				this.direction = direction;
				this.timeInForce = timeInForce;
				this.legs = {
					position_effect: side === "buy" ? "open" : "close",
					side: side,
					ratio_quantity: 1,
					option: optionInstrument.instrumentURL
				};
				this.type = type;
				this.quantity = quantity;
			// }
		} else {
			this.executed = true;
			this.response = this._parse(object);
		}
	}

	_parse(object) {
		return {
			direction: String(object.direction),
			premium: Number(object.premium),
			processedPremium: Number(object.processed_premium),
			timeInForce: String(object.time_in_force),
			referenceID: String(object.ref_id),
			price: Number(object.price),
			trigger: String(object.trigger),
			legs: object.legs,
			type: object.type,
			quantity: {
				total: Number(object.quantity),
				pending: Number(object.pending_quantity),
				canceled: Number(object.canceled_quantity)
			},
			chain: {
				id: String(object.chain_id),
				symbol: String(object.chain_symbol)
			},
			dates: {
				created: new Date(object.created_at),
				updated: new Date(object.updated_at)
			}
		}
	}

	submit() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request.post({
				uri: _this.url + "/options/orders/",
				headers: {
					'Authorization': 'Token ' + _this.User.getAuthToken()
				},
				form: {
					account: _this.url + "/accounts/" + _this.User.getAccountNumber() + "/",
					direction: _this.direction,
					time_in_force: _this.timeInForce,
					legs: _this.legs,
					type: _this.type,
					quantity: _this.quantity
				}
			}, (error, response, body) => {
				console.log(response.statusCode);
				console.log(JSON.parse(body));
				// return Robinhood.handleResponse(error, response, body, _this.User.getAuthToken(), res => {
				// 	_this.executed = true;
				// 	_this.response = this._parse(res);
				// 	resolve(res);
				// }, reject);
			})
		})
	}

	static getRecentOrders(user) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/options/orders/",
				headers: {
					'Authorization': 'Token ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					let array = [];
					res.forEach(o => {
						array.push(new OptionOrder(o, user));
					});
					resolve(array);
				}, reject);
			})
		})
	}

	// GET

	/**
	 * @returns {Array}
	 */
	getLegs() {
		return this.response.legs;
	}

	/**
	 * @returns {String}
	 */
	getDirection() {
		return this.response.direction;
	}

	/**
	 * @returns {Number}
	 */
	getPremium() {
		return this.response.premium;
	}

	/**
	 * @returns {Number}
	 */
	getProcessedPremium() {
		return this.response.processedPremium;
	}

	/**
	 * @returns {String}
	 */
	getTimeInForce() {
		return this.response.timeInForce;
	}

	/**
	 * @returns {String}
	 */
	getReferenceID() {
		return this.response.referenceID;
	}

	/**
	 * @returns {Number}
	 */
	getPrice() {
		return this.response.price;
	}

	/**
	 * @returns {String}
	 */
	getTrigger() {
		return this.response.trigger;
	}

	/**
	 * @returns {String}
	 */
	getType() {
		return this.response.type;
	}

	/**
	 * @returns {Number}
	 */
	getQuantity() {
		return this.response.quantity.total;
	}

	/**
	 * @returns {Number}
	 */
	getQuantityPending() {
		return this.response.quantity.pending;
	}

	/**
	 * @returns {Number}
	 */
	getQuantityCanceled() {
		return this.response.quantity.canceled;
	}

	/**
	 * @returns {String}
	 */
	getChainID() {
		return this.response.chain.id;
	}

	/**
	 * @returns {String}
	 */
	getSymbol() {
		return this.response.chain.symbol;
	}

	/**
	 * @returns {Date}
	 */
	getDateCreated() {
		return this.response.dates.created;
	}

	// BOOLEANS

	/**
	 * @returns {Boolean}
	 */
	isExecuted() {
		return this.executed;
	}

	/**
	 * @returns {Boolean}
	 */
	isCredit() {
		return this.response.direction === "credit";
	}

	/**
	 * @returns {Boolean}
	 */
	isDebit() {
		return this.response.direction === "debit";
	}

}

module.exports = OptionOrder;