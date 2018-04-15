const Robinhood = require('./Robinhood');
const request = require('request');

let allInstrumentsArray = [];

/**
 * BETA: Represents an option traded on Robinhood.
 */
class OptionInstrument extends Robinhood {

	constructor(object) {
		if (!object instanceof Object) throw new Error("Parameter 'object' must be an object.");
		else {
			super();
			this.tradability = String(object.tradability);
			this.strikePrice = Number(object.strike_price);
			this.state = String(object.state);
			this.type = String(object.type); // CALL, PUT
			this.symbol = String(object.chain_symbol);
			this.minTicks = Object(object.min_ticks);
			this.instrumentURL = String(object.url);
			this.ids = {
				chain: String(object.chain_id),
				option: String(object.id)
			};
			this.dates = {
				expiration: new Date(object.expiration_date),
				created: new Date(object.created_at),
				updated: new Date(object.updated_at)
			};
		}
	}

	/**
	 * Returns an array of options instruments for the specified symbol.
	 * WARNING: As there is no apparent way to query Robinhood options by symbol, all instruments will be downloaded and filtered. This will take a while on first run. After, set 'cache' to true.
	 * @param {User} user
	 * @param {String} symbol
	 * @param {Boolean} cache
	 * @returns {Promise<Array>}
	 */
	static getBySymbol(user, symbol, cache) {
		return new Promise((resolve, reject) => {
			if (!symbol instanceof String) reject(new Error("Parameter 'symbol' must be a string."));
			else if ((cache || cache === null) && allInstrumentsArray.length !== 0)
				return allInstrumentsArray.filter(o => o.getSymbol() === symbol);
			else request({
				uri: "https://api.robinhood.com/options/instruments/",
				headers: {
					'Authorization': 'Token ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					allInstrumentsArray = [];
					res.forEach(o => allInstrumentsArray.push(new OptionInstrument(o)));
					return allInstrumentsArray.filter(o => o.getSymbol() === symbol);
				}, reject);
			})
		})
	}

	/**
	 * Returns an options instrument object for the specified instrument URL.
	 * @param {User} user
	 * @param {String} url
	 * @returns {Promise<Instrument>}
	 */
	static getByURL(user, url) {
		return new Promise((resolve, reject) => {
			if (!url instanceof String) reject(new Error("Parameter 'url' must be a string."));
			request({
				uri: url,
				headers: {
					'Authorization': 'Token ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				console.log(JSON.parse(body));
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					resolve(new OptionInstrument(res));
				}, reject);
			})
		})
	}

	// GET

	/**
	 * @returns {String}
	 */
	getTradability() {
		return this.tradability;
	}

	/**
	 * @returns {Number}
	 */
	getStrikePrice() {
		return this.strikePrice;
	}

	/**
	 * @returns {String}
	 */
	getState() {
		return this.state;
	}

	/**
	 * @returns {String}
	 */
	getType() {
		return this.type;
	}

	/**
	 * @returns {String}
	 */
	getSymbol() {
		return this.symbol;
	}

	/**
	 * @returns {Object}
	 */
	getMiniumumTicks() {
		return this.minTicks;
	}

	/**
	 * @returns {String}
	 */
	getChainID() {
		return this.ids.chain;
	}

	/**
	 * @returns {String}
	 */
	getOptionID() {
		return this.ids.option;
	}

	/**
	 * @returns {Date}
	 */
	getExpiration() {
		return this.dates.expiration;
	}

	// BOOLEANS

	isPut() {
		return this.type === "put";
	}

	isCall() {
		return this.type === "call";
	}

}

module.exports = OptionInstrument;