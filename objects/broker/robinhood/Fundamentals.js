const Robinhood = require('./Robinhood');
const request = require('request');

/**
 * Market data for the given equity, such as market cap, dividend yield, P/E ratio, description, and more.
 */
class Fundamentals extends Robinhood {

	/**
	 * Creates a new Fundamentals object.
	 * @author Torrey Leonard <https://github.com/Ladinn>
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
	 * @author Torrey Leonard <https://github.com/Ladinn>
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
	 * @author Torrey Leonard <https://github.com/Ladinn>
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
	 * @author Torrey Leonard <https://github.com/Ladinn>
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
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getOpen() {
		return this.open;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getHigh() {
		return this.high;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getLow() {
		return this.low;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getVolume() {
		return this.volume;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getAverageVolume() {
		return this.averageVolume;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	get52WeekHigh() {
		return this._52wkHigh;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	get52WeekLow() {
		return this._52wkLow;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getMarketCap() {
		return this.marketCap;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getDividendYield() {
		return this.dividendYield;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getPERatio() {
		return this.peRatio;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getDescription() {
		return this.description;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getHeadquarters() {
		let location = this.description.split("headquartered in ")[1];
		if (location !== undefined) return location.slice(0, -1);
		else return null;
	}

}

module.exports = Fundamentals;