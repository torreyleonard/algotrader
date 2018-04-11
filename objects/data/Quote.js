const request = require('request');

class Quote {

	/**
	 * Creates a new Quote object.
	 * @param {Array} array
	 */
	constructor(array) {
		this.array = array;
	}

	/**
	 * Returns a new Quote object with data from Yahoo Finance.
	 * @param {String} range - 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
	 * @param {String} interval - 1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo
	 * @param {Boolean} extended - Whether to include extended hours or not.
	 * @returns {Promise<Quote>}
	 */
	static getFromYahoo(range, interval, extended) {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"].indexOf(range) === -1) reject(new Error("Parameter 'range' is invalid.\nValid ranges are 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, and max."))
			else if (["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"].indexOf(interval) === -1) reject(new Error("Parameter 'interval' is invalid.\nValid intervals are 1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, and 3mo."));
			else {
				const url = "https://query2.finance.yahoo.com/v7/finance/chart/" + _this.symbol + "?range=" + range + "&interval=" + interval + "&indicators=quote&includeTimestamps=true&includePrePost=" + extended + "&events=div%7Csplit%7Cearn";
				request(url, (error, response, body) => {
					if (error) reject(error);
					else if (response.statusCode !== 200) reject(new Error(body));
					else try {

						let json = JSON.parse(body);
						json = json.chart.result[0];

						const timestamps = json.timestamp;
						const quote = json.indicators.quote[0];

						let array = [];

						Object.keys(timestamps).forEach(key => {
							if (quote.open[key] !== null) array.push({
								date: new Date(timestamps[key] * 1000),
								open: parseFloat(quote.open[key]),
								high: parseFloat(quote.high[key]),
								low: parseFloat(quote.low[key]),
								close: parseFloat(quote.close[key]),
								volume: parseInt(quote.volume[key])
							});
						});

						resolve(new Quote(array));

					} catch (error) {
						reject(error);
					}
				})
			}
		})
	}

}