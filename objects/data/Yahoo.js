const LibraryError = require('../globals/LibraryError');
const Quote = require('../globals/Quote');
const OptionsChain = require('../globals/OptionsChain');
const request = require('request');
const async = require('async');
const ora = require('ora');

/**
 * Used to interact with the Yahoo Finance API.
 */
class Yahoo {

	/**
	 * Returns an array of Quote objects from Yahoo Finance.
	 * @param {String} symbol
	 * @param {String} range - How far back to retrieve data: [1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max]
	 * @param {String} interval - How long each quote should represent: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
	 * @param {Boolean} extended - Whether to include data from extended trading hours.
	 * @returns {Promise<Array>}
	 */
	static getQuotes(symbol, range, interval, extended) {
		return new Promise((resolve, reject) => {
			request({
				uri: "https://query2.finance.yahoo.com/v7/finance/chart/" + symbol + "?range=" + range + "&interval=" + interval + "&indicators=quote&includeTimestamps=true&includePrePost=" + extended + "&events=div%7Csplit%7Cearn"
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else {

					let json = JSON.parse(body).chart.result[0];

					let array = [];

					const timestamps = json.timestamp;
					const quotes = json.indicators.quote[0];

					Object.keys(timestamps).forEach(key => {
						if (quotes[key] !== null) array.push(
							new Quote({
								symbol: symbol,
								source: "Yahoo/" + json.meta.exchangeName,
								date: new Date(timestamps[key] * 1000),
								price: {
									open: Number(quotes.open[key]),
									high: Number(quotes.high[key]),
									low: Number(quotes.low[key]),
									close: Number(quotes.close[key]),
									volume: Number(quotes.volume[key])
								}
							})
						)
					});

					resolve(array);

				}
			})
		})
	}

	/**
	 * Returns a new OptionsChain object with data from Yahoo Finance.
	 * @param {String} symbol
	 * @returns {Promise<OptionsChain>}
	 */
	static getOptionsChain(symbol) {
		return new Promise((resolve, reject) => {
			const loading = ora("Downloading from Yahoo! Finance...").start();
			request('https://query2.finance.yahoo.com/v7/finance/options/' + symbol, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new LibraryError(body));
				else try {
						let json = JSON.parse(body);
						let data = json.optionChain.result[0];
						const timestamps = data.expirationDates;
						let array = [];
						async.forEachOf(timestamps, (value, key, callback) => {
							request('https://query2.finance.yahoo.com/v7/finance/options/' + symbol + '?date=' + value, (error, response, body) => {
								if (error) reject(error);
								else if (response.statusCode !== 200) reject(new LibraryError(body));
								else try {

										json = JSON.parse(body);
										data = json.optionChain.result[0];

										const options = data.options[0];
										const calls = options.calls;
										const puts = options.puts;

										let callVolume = 0;
										let putVolume = 0;

										let callOpenInterest = 0;
										let putOpenInterest = 0;

										let callObject = {};
										let putObject = {};

										calls.forEach(value => {
											callVolume += value.volume;
											callOpenInterest += value.openInterest;
											callObject[Number(value.strike)] = {
												strike: Number(value.strike),
												lastPrice: Number(value.lastPrice),
												bid: Number(value.bid),
												ask: Number(value.ask),
												change: Number(value.change),
												volume: Number(value.volume),
												openInterest: Number(value.openInterest),
												lastTradeDate: new Date(value.lastTradeDate * 1000),
												impliedVolatility: Number(value.impliedVolatility),
												inTheMoney: Boolean(value.inTheMoney)
											}
										});

										puts.forEach(value => {
											putVolume += Number(value.volume);
											putOpenInterest += Number(value.openInterest);
											putObject[Number(value.strike)] = {
												strike: Number(value.strike),
												lastPrice: Number(value.lastPrice),
												bid: Number(value.bid),
												ask: Number(value.ask),
												change: Number(value.change),
												volume: Number(value.volume),
												openInterest: Number(value.openInterest),
												lastTradeDate: new Date(value.lastTradeDate * 1000),
												impliedVolatility: Number(value.impliedVolatility),
												inTheMoney: Boolean(value.inTheMoney)
											}
										});

										let ratio = (putVolume + putOpenInterest) / (callVolume + callOpenInterest);

										if (!isNaN(ratio)) {
											array.push({
												date: new Date(value * 1000),
												callVolume: callVolume,
												putVolume: putVolume,
												callOpenInterest: callOpenInterest,
												putOpenInterest: putOpenInterest,
												putCallRatio: ratio,
												calls: callObject,
												puts: putObject
											});
										}

										loading.text += '.';
										callback();

									} catch (error) {
										reject(error);
									}
							});
						}, () => {
							loading.succeed("Download complete.");
							resolve(new OptionsChain(array))
						} );
					} catch (error) {
						reject(error);
					}
			});
		})
	}

}

module.exports = Yahoo;