const request = require('request');

class Quote {

	/**
	 * Creates a new Quote instance.
	 * @param {Object} object
	 * @property {String} symbol
	 * @property {Date} date
	 * @property {String} source
	 * @property {Object} price
	 * @property {Number} price.last
	 * @property {Number} price.open
	 * @property {Number} price.high
	 * @property {Number} price.low
	 * @property {Number} price.close
	 * @property {Number} price.volume
	 * @property {Number} price.adjustedClose
	 * @property {Object} dom
	 * @property {Number} dom.bid.price
	 * @property {Number} dom.bid.size
	 * @property {Number} dom.ask.price
	 * @property {Number} dom.ask.size
	 * @property {Object} meta - Price changes, dividends, splits, market cap, etc.
	 * @property {String} original - Original JSON string
	 */
	constructor(object) {
		this.symbol = object.symbol;
		this.date = object.date;
		this.source = object.source;
		this.price = object.price;
		this.dom = object.dom;
		this.meta = object.meta;
		this.original = object.original;
	}

	// GET

	/**
	 * @returns {String}
	 */
	getSymbol() {
		return this.symbol;
	}

	/**
	 * @returns {Date}
	 */
	getDate() {
		return this.date;
	}

	/**
	 * @returns {String}
	 */
	getSource() {
		return this.source;
	}

	/**
	 * @returns {Number|Null}
	 */
	getLast() {
		return this.price.last;
	}

	/**
	 * @returns {Number|Null}
	 */
	getOpen() {
		return this.price.open;
	}

	/**
	 * @returns {Number|Null}
	 */
	getHigh() {
		return this.price.high;
	}

	/**
	 * @returns {Number|Null}
	 */
	getLow() {
		return this.price.low;
	}

	/**
	 * @returns {Number|Null}
	 */
	getClose() {
		return this.price.close;
	}

	/**
	 * @returns {Number|Null}
	 */
	getVolume() {
		return this.price.volume;
	}

	/**
	 * @returns {Number|Null}
	 */
	getAdjustedClose() {
		return this.price.adjustedClose;
	}

	/**
	 * @returns {Number|Null}
	 */
	getBidPrice() {
		return this.dom.bid.price;
	}

	/**
	 * @returns {Number|Null}
	 */
	getBidSize() {
		return this.dom.bid.size;
	}

	/**
	 * @returns {Number|Null}
	 */
	getAskPrice() {
		return this.dom.ask.price;
	}

	/**
	 * @returns {Number|Null}
	 */
	getAskSize() {
		return this.dom.ask.size;
	}

	/**
	 * @returns {Object|Null}
	 */
	getMeta() {
		return this.meta;
	}

	/**
	 * @returns {String}
	 */
	getOriginal() {
		return this.original;
	}

}

module.exports = Quote;