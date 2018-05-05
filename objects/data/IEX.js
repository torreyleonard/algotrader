const Quote = require('../globals/Quote');
const LibraryError = require('../globals/LibraryError');
const News = require('./News');
const request = require('request');

const url = "https://api.iextrading.com/1.0/";

/**
 * Used to interact with the IEX api. See the official documentation for more: https://iextrading.com/developer/docs/#last
 */
class IEX {

	/**
	 * @private
	 */
	static _request(endpoint, qs) {
		return new Promise((resolve, reject) => {
			request({
				uri: url + endpoint,
				qs: qs
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else resolve(JSON.parse(body), body);
			})
		});
	}

	/**
	 * Returns a quote object for the given symbol.
	 * @param {String} symbol
	 * @returns {Promise<Quote>}
	 */
	static getQuote(symbol) {
		return IEX._request(`stock/${symbol}/book`).then((json, body) => {
			return new Quote({
				symbol: symbol,
				date: new Date(json.quote.latestUpdate),
				source: "IEX",
				price: {
					last: json.quote.latestPrice,
					open: json.quote.open,
					high: json.quote.high,
					low: json.quote.low,
					close: json.quote.close,
					volume: json.quote.latestVolume
				},
				dom: {
					bids: json.bids,
					asks: json.asks
				},
				original: body
			});
		})
	}

	/**
	 * Returns an array of quote objects for the given symbols.
	 * @param {String[]} symbolArray - An array of symbols to query
	 * @returns {Promise<Quote[]>}
	 */
	static getBatchQuotes(symbolArray) {
		return IEX._request("/stock/market/batch", {
			symbols: symbolArray.join(','),
			types: "quote"
		}).then((json, body) => {
			let array = [];
			Object.keys(json).forEach(key => {
				let self = json[key].quote;
				array.push(new Quote({
					symbol: self.symbol,
					date: new Date(self.latestUpdate),
					source: "IEX",
					price: {
						last: self.latestPrice,
						open: self.open,
						high: self.high,
						low: self.low,
						close: self.close,
						volume: self.latestVolume
					},
					original: body
				}));
			});
			return array;
		});
	}

	// /**
	//  * Returns an array of quotes ordered chronologically for the given symbol (aka 'chart)
	//  * @param {String} symbol
	//  * @returns {Promise<Quote[]>}
	//  */
	// static getQuotes(symbol) {
	//
	// }

	/**
	 * Returns an object containing data on the given company.
	 * https://iextrading.com/developer/docs/#company
	 * @param {String} symbol
	 * @returns {Promise<Object>}
	 */
	static getCompanyDetails(symbol) {
		return IEX._request(`/stock/${symbol}/company`).then(res => {
			return res;
		})
	}

	/**
	 * Returns an object containing data on dividends issued by the given company.
	 * https://iextrading.com/developer/docs/#dividends
	 * @param {String} symbol
	 * @returns {Promise<Object>}
	 */
	static getDividends(symbol) {
		return IEX._request(`/stock/${symbol}/dividends`, {
			range: "5y"
		}).then(res => {
			return res;
		})
	}

	/**
	 * Returns an object containing data on the four most recent earnings reports by the given company.
	 * https://iextrading.com/developer/docs/#earnings
	 * @param {String} symbol
	 * @returns {Promise<Object>}
	 */
	static getEarnings(symbol) {
		return IEX._request(`/stock/${symbol}/earnings`).then(res => {
			return res;
		})
	}

	/**
	 * Returns an object containing data on the given company's income statement, balance sheet, and cash flow from the four most recent reported quarters.
	 * https://iextrading.com/developer/docs/#financials
	 * @param {String} symbol
	 * @returns {Promise<Object>}
	 */
	static getFinancials(symbol) {
		return IEX._request(`/stock/${symbol}/financials`).then(res => {
			return res;
		})
	}

	/**
	 * Returns an object containing data on the given company's market cap, beta, 52-week high & low, change, short intereste, dividend rate, float, EBITDA, cash, and more.
	 * https://iextrading.com/developer/docs/#key-stats
	 * @param {String} symbol
	 * @returns {Promise<Object>}
	 */
	static getStats(symbol) {
		return IEX._request(`/stock/${symbol}/stats`).then(res => {
			return res;
		})
	}

	/**
	 * Returns a string containing a URL endpoint with the given company's logo.
	 * https://iextrading.com/developer/docs/#logo
	 * @param {String} symbol
	 * @returns {Promise<String>}
	 */
	static getLogo(symbol) {
		return IEX._request(`/stock/${symbol}/logo`).then(res => {
			return res.url;
		})
	}

	/**
	 * Returns an array of news objects for the given symbol.
	 * https://iextrading.com/developer/docs/#logo
	 * @param {String} symbol
	 * @returns {Promise<News[]>}
	 */
	static getNews(symbol) {
		return IEX._request(`/stock/${symbol}/news`).then(res => {
			let array = [];
			res.forEach(o => {
				array.push(new News({
					title: o.headline,
					description: o.summary,
					date: new Date(o.datetime),
					source: o.source,
					url: o.url
				}))
			});
			return array;
		})
	}

	/**
	 * Returns an array of peer tickers as defined by IEX.
	 * https://iextrading.com/developer/docs/#peers
	 * @param {String} symbol
	 * @returns {Promise<String[]>}
	 */
	static getPeers(symbol) {
		return IEX._request(`/stock/${symbol}/peers`).then(res => {
			return res;
		})
	}

	/**
	 * Returns an object containing data on stock splits issued by the given company.
	 * https://iextrading.com/developer/docs/#dividends
	 * @param {String} symbol
	 * @returns {Promise<Object>}
	 */
	static getSplits(symbol) {
		return IEX._request(`/stock/${symbol}/splits`, {
			range: "5y"
		}).then(res => {
			return res;
		})
	}

	/**
	 * This returns 15 minute delayed and 30 day average consolidated volume percentage of a stock, by market.
	 * This call will always return 13 values, and will be sorted in ascending order by current day trading volume percentage.
	 * https://iextrading.com/developer/docs/#volume-by-venue
	 * @param {String} symbol
	 * @returns {Promise<String[]>}
	 */
	static getVolumeByVenue(symbol) {
		return IEX._request(`/stock/${symbol}/volume-by-venue`).then(res => {
			return res;
		})
	}

	/**
	 * Returns an array of symbols IEX supports for trading.
	 * https://iextrading.com/developer/docs/#symbols
	 * @returns {Promise<Object[]>}
	 */
	static getAllSymbols() {
		return IEX._request(`/ref-data/symbols`).then(res => {
			return res;
		})
	}

}

module.exports = IEX;