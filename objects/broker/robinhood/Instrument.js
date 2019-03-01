const Robinhood = require('./Robinhood');
const Fundamentals = require('./Fundamentals');
const Market = require('./Market');
const Quote = require('../../globals/Quote');
const LibraryError = require('../../globals/LibraryError');

const request = require('request');
const async = require('async');

/**
 * Represents a security traded on Robinhood.
 */
class Instrument extends Robinhood {

	/**
	 * Creates a new Instrument object.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @constructor
	 * @param {Object} object
	 */
	constructor(object) {
		if (!object instanceof Object) throw new Error("Parameter 'object' must be an object.");
		else {
			super();
			this.name = String(object.name);
			this.simpleName = String(object.simple_name);
			this.symbol = String(object.symbol);
			this.listDate = new Date(object.list_date);
			this.country = String(object.country);
			this.tradeable = Boolean(object.tradeable);
			this.type = String(object.type);
			this.bloomberg = String(object.bloomberg_unique);
			this.state = String(object.state);
			this.id = String(object.id);
			this.urls = {
				market: String(object.market),
				fundamentals: String(object.fundamentals),
				quote: String(object.quote),
				instrument: String(object.url),
				splits: String(object.splits)
			};
			this.margin = {
				initialRatio: Number(object.margin_initial_ratio),
				dayTradeRatio: Number(object.day_trade_ratio),
				maintenanceRatio: Number(object.maintenance_ratio)
			}
		}
	}

	// Static initializer methods

	/**
	 * Returns an array of all available instruments.
	 * WARNING: this will take a while!
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Array>}
	 */
	static getAll() {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/instruments/"
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					let array = [];
					res.forEach(obj => {
						array.push(new Instrument(obj));
					});
					resolve(array);
				}, reject);
			})
		})
	}

	/**
	 * Returns an instrument object for the specified symbol.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} symbol
	 * @returns {Promise<Instrument>}
	 */
	static getBySymbol(symbol) {
		return new Promise((resolve, reject) => {
			if (!symbol instanceof String) reject(new Error("Parameter 'symbol' must be a string."));
			else request({
				uri: "https://api.robinhood.com/instruments/",
				qs: {
					symbol: symbol
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					if (res.length !== undefined) reject(new LibraryError("Invalid instrument symbol."));
					else resolve(new Instrument(res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an instrument object for the specified Robinhood instrument ID.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} id
	 * @returns {Promise<Instrument>}
	 */
	static getByID(id) {
		return new Promise((resolve, reject) => {
			if (!id instanceof String) reject(new Error("Parameter 'id' must be a string."));
			else request({
				uri: "https://api.robinhood.com/instruments/" + id + "/"
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(new Instrument(res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an instrument object for the specified instrument URL.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} instrumentURL
	 * @returns {Promise<Instrument>}
	 */
	static getByURL(instrumentURL) {
		return new Promise((resolve, reject) => {
			if (!instrumentURL instanceof String) reject(new Error("Parameter 'instrumentURL' must be a string."));
			request({
				uri: instrumentURL
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(new Instrument(res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an array of Instruments for 10 of the top moving S&P 500 equities.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} direction - Possible options: [up, down]
	 * @returns {Promise<Instrument>}
	 */
	static getTopMoving(direction) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/midlands/movers/sp500/",
				qs: {
					direction: direction.toLowerCase()
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, null, res => {
					let array = [];
					async.forEachOf(res, (value, key, callback) => {
						Instrument.getByURL(value.instrument_url).then(ins => {
							array.push(ins);
							callback();
						}).catch(error => reject(new RequestError(error)));
					}, () => {
						resolve(array);
					})
				}, reject);
			});
		})
	}

	/**
	 * Returns an array of instrument objects for the specified array of IDs.
	 *
	 * Note: large arrays will take longer to process and are capped at 50 per request, so multiple
	 * requests will be sent as the function iterates through the array.
	 *
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 *
	 * @param {Array} ids
	 * @returns {Promise<Array>}
	 */
	static getByIdArray(ids) {
		return new Promise((resolve, reject) => {
			if (!ids instanceof Array) reject(new Error("Parameter 'ids' must be an array."));
			else {
				let array = [];
				let maxAtOnce = 50;
				async.whilst(() => { return ids.length !== 0 }, callback => {
					let newIds = ids.slice(0, maxAtOnce);
					ids = ids.length >= maxAtOnce ? ids.slice(maxAtOnce, ids.length) : [];
					request({
						uri: "https://api.robinhood.com/instruments/",
						qs: {
							ids: newIds.join(',')
						}
					}, (error, response, body) => {
						return Robinhood.handleResponse(error, response, body, null, res => {
							res.forEach(o => {
								if (o !== null) array.push(new Instrument(o));
							});
							callback();
						}, reject);
					})
				}, () => {
					resolve(array);
				});
			}
		})
	}

	/**
	 * Returns an array of known categories that can be used with getByCategory(). This list is non-exhaustive.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Array<String>}
	 */
	static getCategories() {
		return [
			"technology", "finance", "etf", "mutual-fund", "entertainment", "female-ceo", "fossil-fuel", "oil-and-gas", "100-most-popular", "large-cap", "investment-trust-or-fund", "consumer-product",
			"social-media", "internet", "aerospace", "software-service", "automotive", "upcoming-earnings", "2015-ipo", "2016-ipo", "2017-ipo", "health", "real-estate", "top-movers",
			"air-transportation", "semiconductor", "building-material", "material", "retail", "credit-card", "business-service", "advertising-and-marketing", "payment", "video-game", "electronics",
			"manufacturing", "conglomerate", "energy", "electric-utilities", "north-america", "us", "engineering", "rental-and-lease", "restaurant", "hospitality", "telecommunications",
			"wireless", "internet", "pharmaceutical", "medical", "healthcare", "cap-weighted", "mid-cap", "small-cap", "packaging"
		]
	}

	/**
	 * Returns an array of Instruments related to the given category.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} category - For possible options see getCategories().
	 * @returns {Promise<Array>}
	 */
	static getByCategory(category) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/midlands/tags/tag/" + category + "/"
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, null, res => {
					let ids = [];
					res.instruments.forEach(o => {
						ids.push(o.split('instruments/')[1].split('/')[0]);
					});
					return Instrument.getByIdArray(ids).then(res => resolve(res)).catch(error => reject(error));
				}, reject);
			});
		})
	}

	/**
	 * Returns an array of Instruments for the top 100 most popular equities on Robinhood.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Array>}
	 */
	static getMostPopular() {
		return Instrument.getByCategory("100-most-popular");
	}

	/**
	 * Returns an array of Instruments that have upcoming earnings.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise.<Array>}
	 */
	static getUpcomingEarnings() {
		return Instrument.getByCategory("upcoming-earnings");
	}

	/**
	 * Returns an array of instruments for stocks from Robinhood's recommendations for the given user.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {User} user - Authenticated user object
	 * @returns {Promise.<Array>}
	 */
	static getRecommendations(user) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://analytics.robinhood.com/instruments/tag/for-you/",
				headers: {
					'Authorization': 'Bearer ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, null, res => {
					let array = [];
					console.log(res);
					async.forEachOf(res.instruments, (value, key, callback) => {
						Instrument.getByID(value.id).then(ins => {
							array.push({
								reason: value.reason,
								InstrumentObject: ins
							});
							callback();
						})
					}, error => {
						if (error) reject(error);
						else resolve(array);
					})
				}, reject);
			});
		})
	}

	// GET from API

	/**
	 * Fills the instrument object with market, fundamental, quote, and split data. Returns an array of Market, Fundamentals, Quote, and Splits objects.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {User} user - Authenticated user object
	 * @returns {Promise<Array>}
	 */
	populate(user) {
		const _this = this;
		return new Promise((resolve, reject) => {
			Promise.all([
				_this.getMarket(),
				_this.getFundamentals(),
				_this.getQuote(user),
				_this.getSplits()
			]).then(q => {
				_this.MarketObject = q[0];
				_this.FundamentalsObject = q[1];
				_this.QuoteObject = q[2];
				_this.splits = q[3];
				resolve(q);
			}).catch(error => reject(error));
		});
	}

	/**
	 * Returns an object with information on the market that this instrument trades on.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Market>}
	 */
	getMarket() {
		return Market.getByURL(this.urls.market);
	}

	/**
	 * Returns a new Fundamentals object with information such as open, high, low, close, volume, market cap, and more, on this instrument.
	 *
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 *
	 * @returns {Promise<Fundamentals>}
	 */
	getFundamentals() {
		return Fundamentals.getByURL(this.urls.fundamentals);
	}

	/**
	 * Returns an object with a real-time quote on this instrument.
	 *
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @author Colin Gillingham <https://github.com/Gillinghammer> (Added user authentication after Robinhood API update - issue #11)
	 *
	 * @param {User} user - Authenticated user object
	 * @returns {Promise<Quote>}
	 */
	getQuote(user) {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.urls.quote,
				headers: {
					Authorization: 'Bearer ' + user.getAuthToken()
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(new Quote(
						{
							symbol: res.symbol,
							date: new Date(res.updated_at),
							source: "Robinhood/" + res.last_trade_price_source,
							price: {
								last: Number(res.last_trade_price) || Number(res.last_extended_hours_trade_price)
							},
							dom: {
								bid: {
									price: Number(res.bid_price),
									size: Number(res.bid_size)
								},
								ask: {
									price: Number(res.ask_price),
									size: Number(res.ask_size)
								}
							},
							meta: {
								isHalted: Boolean(res.trading_halted),
								hasTraded: Boolean(res.has_traded)
							},
							original: JSON.stringify(res)
						}
					));
				}, reject);
			})
		})
	}

	/**
	 * Returns an object containing details on past stock splits.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getSplits() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.urls.splits
			}, (error, response, body) =>
				Robinhood.handleResponse(error, response, body, null, resolve, reject)
			);
		})
	}

	/**
	 * Returns an object containing this company's past and future earnings data.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object>}
	 */
	getEarnings() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/marketdata/earnings/",
				qs: {
					symbol: _this.symbol
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, null, resolve, reject);
			})
		})
	}

	/**
	 * Returns the high, low, and average prices paid for the instrument by other Robinhood users.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @author rclai (Discovered API endpoint)
	 * @returns {Promise<Object>}
	 */
	getPricesPaid() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: "https://analytics.robinhood.com/instruments/price_distribution/" + _this.id
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, null, res => {
					resolve({
						high: res.high,
						low: res.low,
						average: res.average_price,
						bins: res.bins
					})
				}, reject);
			})
		})
	}

	/**
	 * Returns the total amount of open positions on this instrument among all Robinhood users.
	 *
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @author rclai (Discovered API endpoint)
	 *
	 * @returns {Promise<Number>}
	 */
	getPopularity() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/instruments/popularity/",
				qs: {
					ids: _this.id
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, null, res => {
					resolve(Number(res.num_open_positions));
				}, reject);
			})
		})
	}

	/**
	 * Returns an object containing buy hold, and sell ratings from major financial institutions, along with text describing the rating.
	 *
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @author rclai (Discovered API endpoint)
	 *
	 * @returns {Promise<Object>}
	 */
	getRatings() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url + "/midlands/ratings/",
				qs: {
					ids: _this.id
				}
			}, (error, response, body) => {
				Robinhood.handleResponse(error, response, body, null, resolve, reject);
			})
		})
	}

	// GET from object

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getName() {
		return this.name;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getSimpleName() {
		return this.simpleName;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getSymbol() {
		return this.symbol;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Date}
	 */
	getListDate() {
		return this.listDate;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getCountry() {
		return this.country;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getType() {
		return this.type;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getBloombergID() {
		return this.bloomberg;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getState() {
		return this.state;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {String}
	 */
	getID() {
		return this.id;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getMarginInitialRatio() {
		return this.margin.initialRatio;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getDayTradeRatio() {
		return this.margin.dayTradeRatio;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Number}
	 */
	getMaintenanceRatio() {
		return this.margin.maintenanceRatio;
	}

	// BOOLEANS

	/**
	 * Checks if the instrument is able to be traded.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Boolean}
	 */
	isTradeable() {
		return this.tradeable;
	}

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {boolean}
	 */
	isActive() {
		return this.state === "active";
	}

	/**
	 * Checks if the instrument is a stock.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Boolean}
	 */
	isStock() {
		return this.type === "stock";
	}

	/**
	 * Checks if the instrument is an exchange traded product.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Boolean}
	 */
	isETP() {
		return this.type === "etp";
	}

	/**
	 * Checks if the instrument is an American Depositary Receipt. Typically applies to foreign companies.
	 * https://www.investopedia.com/terms/a/adr.asp
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Boolean}
	 */
	isADR() {
		return this.type === "adr";
	}

	/**
	 * Check whether another instance of Instrument equals this instance.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {Instrument} otherInstrument
	 * @returns {Boolean}
	 */
	equals(otherInstrument) {
		return otherInstrument.getSymbol() === this.symbol;
	}

}

module.exports = Instrument;