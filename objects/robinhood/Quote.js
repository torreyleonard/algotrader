const Robinhood = require('./Robinhood');
const request = require('request');

class Quote extends Robinhood {

	/**
	 * Creates a new Quote object.
	 * @param {Object} object
	 */
	constructor(object) {
		if (!object instanceof Object) throw new Error("Parameter 'object' must be an object.");
		else {
			super();
			this.ask = {
				price: Number(object.ask_price),
				size: Number(object.ask_size)
			};
			this.bid = {
				price: Number(object.bid_price),
				size: Number(object.bid_size)
			};
			this.last = {
				price: Number(object.last_trade_price),
				extendedHoursPrice: Number(object.last_extended_hours_trade_price),
				source: String(object.last_trade_price_source)
			};
			this.previousClose = {
				price: Number(object.previous_close),
				adjusted: Number(object.adjusted_previous_close),
				date: new Date(object.previous_close_date)
			};
			this.symbol = String(object.symbol);
			this.halted = Boolean(object.trading_halted);
			this.traded = Boolean(object.has_traded);
			this.updated = new Date(object.updated_at);
			this.instrument = String(object.instrument);
		}
	}

	/**
	 * Returns a quote object for the given symbol.
	 * @param {String} symbol
	 * @returns {Promise}
	 */
	static getBySymbol(symbol) {
		return new Promise((resolve, reject) => {
			if (!symbol instanceof String) reject(new Error("Parameter 'symbol' must be a string."));
			else request({
				uri: "https://api.robinhood.com/quotes/" + symbol + "/"
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(new Quote(res));
				}, reject);
			})
		})
	}

	static getBySymbolArray(array) {
		return new Promise((resolve, reject) => {
			if (!array instanceof Array) reject(new Error("Parameter 'array' must be an array."));
			else request({
				uri: "https://api.robinhood.com/quotes/?symbols=" + array.join()
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					let array = [];
					res.forEach(q => array.push(new Quote(q)));
					resolve(array);
				}, reject);
			})
		})
	}

	// GET

	/**
	 * @returns {Number}
	 */
	getAskPrice() {
		return this.ask.price;
	}

	/**
	 * @returns {Number}
	 */
	getAskSize() {
		return this.ask.size;
	}

	/**
	 * @returns {Number}
	 */
	getBidPrice() {
		return this.bid.price;
	}

	/**
	 * @returns {Number}
	 */
	getBidSize() {
		return this.bid.size;
	}

	/**
	 * @returns {Number}
	 */
	getLast() {
		return this.last.price;
	}

	/**
	 * @returns {Number}
	 */
	getLastExtendedHours() {
		return this.last.extendedHoursPrice;
	}

	/**
	 * @returns {String}
	 */
	getLastSource() {
		return this.last.source;
	}

	/**
	 * @returns {Number}
	 */
	getPreviousClose() {
		return this.previousClose.price;
	}

	/**
	 * @returns {Number}
	 */
	getPreviousCloseAdjusted() {
		return this.previousClose.adjusted;
	}

	/**
	 * @returns {Date}
	 */
	getPreviousCloseDate() {
		return this.previousClose.date;
	}

	/**
	 * @returns {String}
	 */
	getSymbol() {
		return this.symbol;
	}

	/**
	 * @returns {Date}
	 */
	getUpdatedDate() {
		return this.updated;
	}

	/**
	 * @returns {String}
	 */
	getInstrumentURL() {
		return this.instrument;
	}

	// BOOLEAN

	/**
	 * @returns {Boolean}
	 */
	isHalted() {
		return this.halted;
	}

	/**
	 * @returns {Boolean}
	 */
	hasTraded() {
		return this.traded;
	}

}

module.exports = Quote;