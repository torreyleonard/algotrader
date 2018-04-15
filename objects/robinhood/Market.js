const Robinhood = require('./Robinhood');
const request = require('request');
const moment = require('moment');

/**
 * Represents an exchange on which securities are traded.
 */
class Market extends Robinhood {

	/**
	 * Creates a new Market object.
	 * @param object
	 */
	constructor(object) {
		if (!object instanceof Object) throw new Error("Parameter 'object' must be an object.");
		else {
			super();
			this.parseHours = function(object) {
				return {
					isOpen: Boolean(object.is_open),
					close: new Date(object.closes_at),
					open: new Date(object.opens_at),
					extendedOpen: new Date(object.extended_opens_at),
					extendedClose: new Date(object.extended_closes_at),
					date: new Date(object.date),
					nextTradingDay: String(object.next_open_hours),
					previousTradingDay: String(object.previous_open_hours)
				}
			}
			this.website = String(object.website);
			this.city = String(object.city);
			this.name = String(object.name);
			this.country = String(object.country);
			this.acronym = String(object.acronym);
			this.timezone = String(object.timezone);
			this.mic = String(object.mic);
			this.hours = this.parseHours(object.hours);
		}
	}

	/**
	 * Returns a Market object for the given Market Identifier Code (MIC).
	 * @param {String} code
	 */
	static getByMIC(code) {
		return new Promise((resolve, reject) => {
			if (!code instanceof String) reject(new Error("Parameter 'code' must be a string."));
			request({
				uri: "https://api.robinhood.com/markets/" + code + "/"
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, market => {
					request({
						uri: market.todays_hours
					}, (error, response, body) => {
						return Robinhood.handleResponse(error, response, body, null, hours => {
							market.hours = hours;
							resolve(new Market(market));
						}, reject);
					})
				}, reject);
			})
		})
	}

	/**
	 * Returns a Market object for the given market URL.
	 * @param {String} url
	 */
	static getByURL(url) {
		return new Promise((resolve, reject) => {
			if (!url instanceof String) reject(new Error("Parameter 'url' must be a string."));
			request({
				uri: url
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, market => {
					request({
						uri: market.todays_hours
					}, (error, response, body) => {
						return Robinhood.handleResponse(error, response, body, null, hours => {
							market.hours = hours;
							resolve(new Market(market));
						}, reject);
					})
				}, reject);
			})
		})
	}

	// GET from API

	/**
	 * Returns an object with hours on the next trading period.
	 * @returns {Promise<Object>}
	 */
	getNextTradingHours() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.hours.nextTradingDay
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(_this.parseHours(res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an object with hours on the previous trading period.
	 * @returns {Promise<Object>}
	 */
	getPreviousTradingHours() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.hours.previousTradingDay
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(_this.parseHours(res));
				}, reject);
			})
		})
	}

	/**
	 * Returns an object with hours for the given date.
	 * @param date
	 * @returns {Promise<Object>}
	 */
	getHoursOn(date) {
		const _this = this;
		return new Promise((resolve, reject) => {
			date = moment(date).format("YYYY-MM-DD");
			request({
				uri: _this.url + "/markets/" + _this.mic + "/hours/" + date + "/"
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, res => {
					resolve(_this.parseHours(res));
				}, reject);
			})
		})
	}

	// GET

	/**
	 * @returns {String}
	 */
	getWebsite() {
		return this.website;
	}

	/**
	 * @returns {String}
	 */
	getCity() {
		return this.city;
	}

	/**
	 * @returns {String}
	 */
	getName() {
		return this.name;
	}

	/**
	 * @returns {String}
	 */
	getCountry() {
		return this.country;
	}

	/**
	 * @returns {String}
	 */
	getCode() {
		return this.mic;
	}

	/**
	 * @returns {String}
	 */
	getAcronym() {
		return this.acronym;
	}

	/**
	 * @returns {{isOpen: boolean, close: Date, open: Date, extendedOpen: Date, extendedClose: Date, date: Date}}
	 */
	getHours() {
		return this.hours;
	}

	/**
	 * @returns {Date}
	 */
	getClose() {
		return this.hours.close;
	}

	/**
	 * @returns {Date}
	 */
	getOpen() {
		return this.hours.open;
	}

	/**
	 * @returns {Date}
	 */
	getExtendedClose() {
		return this.hours.extendedClose;
	}

	/**
	 * @returns {Date}
	 */
	getExtendedOpen() {
		return this.hours.extendedOpen;
	}

	// BOOLEAN

	/**
	 * @returns {Boolean}
	 */
	isOpen() {
		return this.hours.isOpen;
	}

}

module.exports = Market;