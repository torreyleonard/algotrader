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

	/**
	 * Returns the volume weighted average price (VWAP) for the given quote array.
	 * https://www.investopedia.com/terms/v/vwap.asp
	 * @param {Array} quoteArray
	 * @returns {Number}
	 */
	static getVWAP(quoteArray) {
		let wPrice = 0;
		let volume = 0;
		quoteArray.forEach(quote => {
			wPrice += ((quote.getHigh() + quote.getLow() + quote.getClose()) / 3) * quote.getVolume();
			volume += quote.getVolume();
		});
		return wPrice / volume;
	}

	/**
	 * Retrieves the highest high and lowest low for the provided period of time.
	 * @param {Array} quoteArray
	 * @param {int} period
	 * @returns {Object}
	 */
	static priceChannel(quoteArray, period) {
		const array = quoteArray.slice(quoteArray.length - period, quoteArray.length);
		let high = { price: { high: 0 } };
		let low = { price: { low: Number.MAX_VALUE } };
		array.forEach(val => {
			if (val.price.high > high.price.high) high = val;
			if (val.price.low < low.price.low && val.price.low > 0) low = val;
		});
		return {
			high: high,
			low: low
		}
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

	getOHLC4() {
		return (this.price.open + this.price.high + this.price.low + this.price.close) / 4;
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