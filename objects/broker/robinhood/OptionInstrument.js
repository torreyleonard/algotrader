const Robinhood = require('./Robinhood');
const request = require('request');
const async = require('async');
const _ = require('lodash');

/**
 * Represents an option traded on Robinhood.
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
	 * Returns an array of all option instruments. Note: this may take an eternity - no need to use this.
	 * @param {User} user
	 * @returns {Promise<Array>}
	 */
	static getAll(user) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/options/instruments/",
				headers: {
					'Authorization': 'Bearer ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					let instrumentsArray = [];
					res.forEach(o => instrumentsArray.push(new OptionInstrument(o)));
					resolve(instrumentsArray);
				}, reject);
			})
		})
	}

	/**
	 * Returns an array of all option instruments for the given expiration date and side. Ordered from lowest to highest strike price.
	 *
	 * @author Ladinn
	 * @author hbeere (Issue #10)
	 *
	 * @param {User} user
	 * @param {Instrument} instrument
	 * @param {String} side - Can be either 'call' or 'put'
	 * @returns {Promise<any>}
	 */
	static getChain(user, instrument, side) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/options/instruments/",
				headers: {
					'Authorization': 'Bearer ' + user.getAuthToken()
				},
				qs: {
					chain_symbol: instrument.symbol,
					type: side,
					tradability: "tradable",
					state: "active"
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					let instrumentsArray = [];
					res.forEach(x => {
						if (Array.isArray(x))
							x.forEach(y => instrumentsArray.push(new OptionInstrument(y)));
						else instrumentsArray.push(new OptionInstrument(x));
					});
					resolve(_.orderBy(instrumentsArray, 'strikePrice'));
				}, reject);
			})
		})
	}

	/**
	 * Returns an array of expiration dates for the given Instrument.
	 * @param {User} user
	 * @param {Instrument} instrument
	 * @returns {Promise<Date[]>}
	 */
	static getExpirations(user, instrument) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/options/chains/",
				headers: {
					'Authorization': 'Bearer ' + user.getAuthToken()
				},
				qs: {
					equity_instrument_ids: instrument.id,
					state: "active",
					tradability: "tradable"
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					if (res instanceof Array) {
						let array = [];
						res.forEach(o => {
							parseChains(o, a => {
								a.forEach(o => array.push(o));
							})
						});
						resolve(array);
					} else parseChains(res, resolve);
				}, reject);
			})
		});
		function parseChains(res, callback) {
			let array = [];
			res.expiration_dates.forEach(date => {
				array.push(new Date(date));
			});
			callback(array);
		}
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
					'Authorization': 'Bearer ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					resolve(new OptionInstrument(res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an array of the user's open option contracts.
	 * @param {User} user
	 * @returns {Promise<Array>}
	 */
	static getPositions(user) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/options/positions/",
				headers: {
					'Authorization': 'Bearer ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, user.getAuthToken(), res => {
					let array = [];
					async.forEachOf(res, (position, key, callback) => {
						position.quantity = Number(position.quantity);
						if (Number(position.quantity) !== 0) {
							OptionInstrument.getByURL(user, position.option).then(instrument => {
								position.InstrumentObject = instrument;
								array.push(position);
								callback();
							});
						} else callback();
					}, () => {
						resolve(array);
					} );
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
	getInstrumentURL() {
		return this.instrumentURL;
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