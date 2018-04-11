const Robinhood = require('./Robinhood');
const request = require('request');

class Fundamentals extends Robinhood {

	/**
	 * Creates a new Fundamentals object.
	 * @param {Object} object
	 */
	constructor(object) {
		if (!object instanceof Object) throw new Error("Parameter 'object' must be an object.");
		else {
			super();
			this.open = Number(object.open);
			this.high = Number(object.high);
			this.low = Number(object.low);
			this.volume = Number(object.volume);
			this.averageVolume = Number(object.average_volume);
			this._52wkHigh = Number(object.high_52_weeks);
			this._52wkLow = Number(object.low_52_weeks);
			this.marketCap = Number(object.market_cap);
			this.dividendYield = Number(object.dividend_yield);
			this.peRatio = Number(object.pe_ratio);
			this.description = String(object.description);
		}
	}

	/**
	 * Returns a fundamentals object for the given symbol.
	 * @param {String} symbol
	 * @returns {Promise<Fundamentals>}
	 */
	static getBySymbol(symbol) {
		return new Promise((resolve, reject) => {
			if (!symbol instanceof String) reject(new Error("Parameter 'symbol' must be a string."));
			else request({
				uri: "https://api.robinhood.com/fundamentals/" + symbol + "/"
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(new Fundamentals(res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an array of fundamentals objects for the symbols in the given array.
	 * @param {Array} array
	 * @returns {Promise<Array>}
	 */
	static getBySymbolArray(array) {
		return new Promise((resolve, reject) => {
			if (!array instanceof Array) reject(new Error("Parameter 'array' must be an array."));
			else request({
				uri: "https://api.robinhood.com/fundamentals/?symbols=" + array.join()
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					let array = [];
					res.forEach(q => array.push(new Fundamentals(q)));
					resolve(array);
				}, reject);
			})
		})
	}

	/**
	 * Returns a fundamentals object for the given URL.
	 * @param {String} url
	 * @returns {Promise<Fundamentals>}
	 */
	static getByURL(url) {
		return new Promise((resolve, reject) => {
			if (!url instanceof String) reject(new Error("Parameter 'url' must be a string."));
			else request({
				uri: url
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(new Fundamentals(res));
				}, reject);
			})
		})
	}

	// GET

	/**
	 * @returns {Number}
	 */
	getOpen() {
		return this.open;
	}

	/**
	 * @returns {Number}
	 */
	getHigh() {
		return this.high;
	}

	/**
	 * @returns {Number}
	 */
	getLow() {
		return this.low;
	}

	/**
	 * @returns {Number}
	 */
	getVolume() {
		return this.volume;
	}

	/**
	 * @returns {Number}
	 */
	getAverageVolume() {
		return this.averageVolume;
	}

	/**
	 * @returns {Number}
	 */
	get52WeekHigh() {
		return this._52wkHigh;
	}

	/**
	 * @returns {Number}
	 */
	get52WeekLow() {
		return this._52wkLow;
	}

	/**
	 * @returns {Number}
	 */
	getMarketCap() {
		return this.marketCap;
	}

	/**
	 * @returns {Number}
	 */
	getDividendYield() {
		return this.dividendYield;
	}

	/**
	 * @returns {Number}
	 */
	getPERatio() {
		return this.peRatio;
	}

	/**
	 * @returns {String}
	 */
	getDescription() {
		return this.description;
	}

	getHeadquarters() {
		let location = this.description.split("headquartered in ")[1];
		if (location !== undefined) return location.slice(0, -1);
		else return null;
	}

}

module.exports = Fundamentals;