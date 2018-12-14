const LibraryError = require('../globals/LibraryError');
const Robinhood = require('../broker/robinhood/Robinhood');
const request = require('request');
const cheerio = require('cheerio');

/**
 * Find and filter securities based on certain criteria.
 */
class Query {

	/**
	 * Searches for a given symbol based on the given string.
	 * @param {String} string - Search query.
	 * @returns {Promise<Array>}
	 */
	static search(string) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'https://autoc.finance.yahoo.com/autoc?query=' + string + '&region=1&lang=en'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
					let result = JSON.parse(body).ResultSet.Result;
					if (result instanceof Array) resolve(result);
					else reject(new LibraryError(body));
				} catch (error) {
					reject(error);
				}
			})
		})
	}

	/**
	 * Returns an array of quotes for the best performing 'x' amount of stocks.
	 * @param {Number} count
	 * @returns {Promise<Array>}
	 */
	static getTopGainers(count) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'https://query2.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=day_gainers&count=' + count + '&corsDomain=finance.yahoo.com'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
					let result = JSON.parse(body).finance.result[0].quotes;
					if (result instanceof Array) resolve(result);
					else reject(new LibraryError(body));
				} catch (error) {
					reject(error);
				}
			})
		})
	}

	/**
	 * Returns an array of quotes for the worst performing 'x' amount of stocks.
	 * @param {Number} count
	 * @returns {Promise<Array>}
	 */
	static getTopLosers(count) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'https://query2.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=day_losers&count=' + count + '&corsDomain=finance.yahoo.com'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
						let result = JSON.parse(body).finance.result[0].quotes;
						if (result instanceof Array) resolve(result);
						else reject(new LibraryError(body));
					} catch (error) {
						reject(error);
					}
			})
		})
	}

	/**
	 * Returns an array of quotes for 'x' amount of stocks with the highest volume today.
	 * @param {Number} count
	 * @returns {Promise<Array>}
	 */
	static getHighestVolume(count) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'https://query2.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=most_actives&count=' + count + '&corsDomain=finance.yahoo.com'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
						let result = JSON.parse(body).finance.result[0].quotes;
						if (result instanceof Array) resolve(result);
						else reject(new LibraryError(body));
					} catch (error) {
						reject(error);
					}
			})
		})
	}

	/**
	 * Returns an array of quotes for options with the highest open interest.
	 * @param {Number} count
	 * @returns {Promise<Array>}
	 */
	static getHighestOpenInterest(count) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'https://query2.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=65f51cea-8dc8-4e56-9f99-6ef7720eb69c&count=' + count + '&corsDomain=finance.yahoo.com'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
						let result = JSON.parse(body).finance.result[0].quotes;
						if (result instanceof Array) resolve(result);
						else reject(new LibraryError(body));
					} catch (error) {
						reject(error);
					}
			})
		})
	}

	/**
	 * Returns an array of quotes for the most actively traded ETFs.
	 * @param {Number} count
	 * @returns {Promise<Array>}
	 */
	static getTopETFs(count) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'https://query2.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=top_etfs_us&count=' + count + '&corsDomain=finance.yahoo.com'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
						let result = JSON.parse(body).finance.result[0].quotes;
						if (result instanceof Array) resolve(result);
						else reject(new LibraryError(body));
					} catch (error) {
						reject(error);
					}
			})
		})
	}

	/**
	 * Returns an array of equities similar to the one given.
	 * @param {String} symbol
	 * @returns {Promise<Array>}
	 */
	static getSimilar(symbol) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'https://query1.finance.yahoo.com/v6/finance/recommendationsbysymbol/' + symbol
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
					let result = JSON.parse(body).finance.result[0].recommendedSymbols;
					if (result instanceof Array) resolve(result);
					else reject(new LibraryError(body));
				} catch (error) {
					reject(error);
				}
			})
		})
	}

	/**
	 * Returns an array of 'x' amount of trending symbols on Yahoo Finance.
	 * @param {Number} count
	 * @returns {Promise<Array>}
	 */
	static getTrendingSymbols(count) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'https://query1.finance.yahoo.com/v1/finance/trending/US?lang=en-US&region=US&count=' + count + '&corsDomain=finance.yahoo.com'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
					const json = JSON.parse(body).finance.result[0].quotes;
					let array = [];
					json.forEach(o => {
						array.push(o.symbol);
					});
					resolve(array);
				} catch (error) {
					reject(error);
				}
			})
		})
	}

	/**
	 * Returns an array of objects with information on companies that are reporting earnings within 'x' number of days, along with estimates and call URLs.
	 * @param {Number} days
	 * @returns {Promise<Array>}
	 */
	static getEarnings(days) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://api.robinhood.com/marketdata/earnings/",
				qs: {
					range: days + "day"
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, resolve, reject);
			})
		})
	};

	/**
	 * Returns an object containing this company's past and future earnings data.
	 * @param {String} symbol
	 * @returns {Promise<Object>}
	 */
	static getEarningsBySymbol(symbol) {
		return new Promise((resolve, reject) => {
			request({
				uri: "http://finance.yahoo.com/q/ks?s=",
				qs: {
					symbol: symbol
				}
			}, (error, response, body) => {
				return Robinhood.handleResponse(error, response, body, null, resolve, reject);
			})
		})
	}

	// static getFinancials(symbol) {
	// 	return new Promise((resolve, reject) => {
	// 		request({
	// 			uri: "http://finance.yahoo.com/q/ks",
	// 			qs: {
	// 				s: symbol
	// 			}
	// 		}, (error, response, body) => {
	// 			if (error) reject(error);
	// 			else if (response.statusCode !== 200) reject(new LibraryError(body));
	// 			else {
	// 				let keys = [];
	// 				let data = [];
	// 				const $ = cheerio.load(body);
	// 				const td = $('.table-qsp-stats');
	// 				$(td).each((j, val) => {
	// 					console.log(val);
	// 					keys[j] = $(val).text();
	// 				});
	// 				$(td).each(function(j, val) {
	// 					data[j] = $(val).text();
	// 				});
	// 				resolve(null);
	// 			}
	// 		})
	// 	})
	// }

}

module.exports = Query;