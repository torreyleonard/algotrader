const Quote = require('../globals/Quote');
const request = require('request');

/**
 * Further documentation can be found here: https://www.alphavantage.co/documentation/
 */
class AlphaVantage {

	/**
	 * Creates a new AlphaVantage instance.
	 * @param {String} apiKey - The free API key retrieved from
	 */
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.url = "https://www.alphavantage.co/query"
	}

	/**
	 * @private
	 */
	_requester(qs) {
		const _this = this;
		return new Promise((resolve, reject) => {
			qs.apikey = _this.apiKey;
			qs.datatype = "json";
			request({
				uri: _this.url,
				qs: qs
			}, (error, response, body ) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(body);
				else {
					const json = JSON.parse(body);
					const objectKey = Object.keys(json)[1];
					resolve(json[objectKey]);
				}
			})
		});
	}

	/**
	 * Returns an array of quotes for the equity specified, updated in real time.
	 * @param {String} symbol
	 * @param {String} interval - How long each quote should represent: 1min, 5min, 15min, 30min, 60min
	 * @returns {Promise.<Array>}
	 */
	timeSeriesIntraday(symbol, interval) {
		return this._requester({
			function: "TIME_SERIES_INTRADAY",
			symbol: symbol,
			interval: interval
		}).then(res => {
			let array = [];
			for (const key in res) {
				if (res.hasOwnProperty(key)) {
					const o = res[key];
					array.push(new Quote({
						symbol: symbol,
						date: new Date(key),
						source: "Alpha Vantage",
						price: {
							open: Number(o["1. open"]),
							high: Number(o["2. high"]),
							low: Number(o["3. low"]),
							close: Number(o["4. close"]),
							volume: Number(o["5. volume"])
						},
						original: JSON.stringify(o)
					}))
				}
			}
			return array;
		})
	}

	/**
	 * Returns an array of quotes for the equity specified, covering up to 20 years of historical data.
	 * @param {String} symbol
	 * @param {Boolean} compact - If true, this will return the last 100 data points. If false, it will return up to 20 years of historical data.
	 * @param {Boolean} adjusted - If true, prices will be adjusted for split/dividend events.
	 * @returns {Promise<Array>}
	 */
	timeSeriesDaily(symbol, compact, adjusted) {
		return this._requester({
			function: adjusted ? "TIME_SERIES_DAILY_ADJUSTED" : "TIME_SERIES_DAILY",
			symbol: symbol,
			outputsize: compact ? "compact" : "full"
		}).then(res => {
			let array = [];
			for (const key in res) {
				if (res.hasOwnProperty(key)) {
					const o = res[key];
					if (adjusted) array.push(new Quote(
						{
							symbol: symbol,
							date: new Date(key),
							source: "Alpha Vantage",
							price: {
								open: Number(o["1. open"]),
								high: Number(o["2. high"]),
								low: Number(o["3. low"]),
								close: Number(o["4. close"]),
								volume: Number(o["6. volume"]),
								adjustedClose: Number(o["5. adjusted close"])
							},
							meta: {
								dividendAmount: o["7. dividend amount"],
								splitCoefficient: o["8. split coefficient"]
							},
							original: JSON.stringify(o)
						}
					));
					else array.push(new Quote(
						{
							symbol: symbol,
							date: new Date(key),
							source: "Alpha Vantage",
							price: {
								open: Number(o["1. open"]),
								high: Number(o["2. high"]),
								low: Number(o["3. low"]),
								close: Number(o["4. close"]),
								volume: Number(o["5. volume"])
							},
							original: JSON.stringify(o)
						}
					))
				}
			}
			return array;
		})
	}

	/**
	 * Returns an array of quotes for the equity specified, covering up to 20 years of historical data.
	 * @param {String} symbol
	 * @param {Boolean} adjusted - If true, prices will be adjusted for split/dividend events.
	 * @returns {Promise<Array>}
	 */
	timeSeriesWeekly(symbol, adjusted) {
		return this._requester({
			function: adjusted ? "TIME_SERIES_WEEKLY_ADJUSTED" : "TIME_SERIES_WEEKLY",
			symbol: symbol
		}).then(res => {
			let array = [];
			for (const key in res) {
				if (res.hasOwnProperty(key)) {
					const o = res[key];
					if (adjusted) array.push(new Quote(
						{
							symbol: symbol,
							date: new Date(key),
							source: "Alpha Vantage",
							price: {
								open: Number(o["1. open"]),
								high: Number(o["2. high"]),
								low: Number(o["3. low"]),
								close: Number(o["4. close"]),
								volume: Number(o["6. volume"]),
								adjustedClose: Number(o["5. adjusted close"])
							},
							meta: {
								dividendAmount: o["7. dividend amount"],
								splitCoefficient: o["8. split coefficient"]
							},
							original: o
						}
					));
					else array.push(new Quote(
						{
							symbol: symbol,
							date: new Date(key),
							source: "Alpha Vantage",
							price: {
								open: Number(o["1. open"]),
								high: Number(o["2. high"]),
								low: Number(o["3. low"]),
								close: Number(o["4. close"]),
								volume: Number(o["5. volume"])
							},
							original: o
						}
					))
				}
			}
			return array;
		})
	}

	/**
	 * Returns an array of quotes for the equity specified, covering up to 20 years of historical data.
	 * @param {String} symbol
	 * @param {Boolean} adjusted - If true, prices will be adjusted for split/dividend events.
	 * @returns {Promise<Array>}
	 */
	timeSeriesMonthly(symbol, adjusted) {
		return this._requester({
			function: adjusted ? "TIME_SERIES_MONTHLY_ADJUSTED" : "TIME_SERIES_MONTHLY",
			symbol: symbol
		}).then(res => {
			let array = [];
			for (const key in res) {
				if (res.hasOwnProperty(key)) {
					const o = res[key];
					if (adjusted) array.push(new Quote(
						{
							symbol: symbol,
							date: new Date(key),
							source: "Alpha Vantage",
							price: {
								open: Number(o["1. open"]),
								high: Number(o["2. high"]),
								low: Number(o["3. low"]),
								close: Number(o["4. close"]),
								volume: Number(o["6. volume"]),
								adjustedClose: Number(o["5. adjusted close"])
							},
							meta: {
								dividendAmount: o["7. dividend amount"],
								splitCoefficient: o["8. split coefficient"]
							},
							original: o
						}
					));
					else array.push(new Quote(
						{
							symbol: symbol,
							date: new Date(key),
							source: "Alpha Vantage",
							price: {
								open: Number(o["1. open"]),
								high: Number(o["2. high"]),
								low: Number(o["3. low"]),
								close: Number(o["4. close"]),
								volume: Number(o["5. volume"])
							},
							original: o
						}
					))
				}
			}
			return array;
		})
	}

	// TECHNICALS

	/**
	 * @private
	 */
	_technical(type, symbol, interval, timePeriod, seriesType, qs) {
		let query = {
			function: type,
			symbol: symbol,
			interval: interval,
			time_period: timePeriod,
			series_type: seriesType
		};
		if (qs) qs.forEach(q => {
			query[q.key] = q.val;
		});
		return this._requester(query).then(res => {
			let array = [];
			for (const key in res) {
				if (res.hasOwnProperty(key)) {
					const o = res[key];
					let newObject = { date: new Date(key) };
					Object.keys(o).forEach(k => {
						newObject[k] = o[k];
					});
					array.push(newObject);
				}
			}
			return array;
		})
	}

	/**
	 * Returns an array of simple moving averages for the equity specified.
	 * https://www.investopedia.com/articles/technical/052201.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	sma(symbol, interval, timePeriod, seriesType) {
		return this._technical("SMA", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of exponential moving averages for the equity specified.
	 * https://www.investopedia.com/terms/e/ema.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	ema(symbol, interval, timePeriod, seriesType) {
		return this._technical("EMA", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of weighted moving averages for the equity specified.
	 * https://www.investopedia.com/articles/technical/060401.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	wma(symbol, interval, timePeriod, seriesType) {
		return this._technical("WMA", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of double exponential moving averages for the equity specified.
	 * http://www.investopedia.com/articles/trading/10/double-exponential-moving-average.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	dema(symbol, interval, timePeriod, seriesType) {
		return this._technical("DEMA", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of double exponential moving averages for the equity specified.
	 * http://www.investopedia.com/articles/trading/10/double-exponential-moving-average.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	dema(symbol, interval, timePeriod, seriesType) {
		return this._technical("DEMA", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of triple exponential moving averages for the equity specified.
	 * https://www.investopedia.com/terms/t/triple-exponential-moving-average.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	tema(symbol, interval, timePeriod, seriesType) {
		return this._technical("TEMA", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of triangular moving averages for the equity specified.
	 * http://www.fmlabs.com/reference/default.htm?url=TriangularMA.htm
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	trima(symbol, interval, timePeriod, seriesType) {
		return this._technical("TRIMA", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of Kaufman adaptive moving averages for the equity specified.
	 * http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:kaufman_s_adaptive_moving_average
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	kama(symbol, interval, timePeriod, seriesType) {
		return this._technical("KAMA", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of MESA adaptive moving averages for the equity specified.
	 * http://www.binarytribune.com/forex-trading-indicators/ehlers-mesa-adaptive-moving-average
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @param {Number} fastLimit
	 * @param {Number} slowLimit
	 * @returns {Promise<Array>}
	 */
	mama(symbol, interval, timePeriod, seriesType, fastLimit, slowLimit) {
		return this._technical("MAMA", symbol, interval, timePeriod, seriesType, [
			{
				key: "fastlimit",
				val: fastLimit
			},
			{
				key: "slowlimit",
				val: slowLimit
			}
		]);
	}

	/**
	 * Returns an array of T3 values for the equity specified.
	 * http://www.fmlabs.com/reference/default.htm?url=T3.htm
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	t3(symbol, interval, timePeriod, seriesType) {
		return this._technical("T3", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of moving average convergence / divergence values for the equity specified.
	 * http://www.investopedia.com/articles/forex/05/macddiverge.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @param {Number|Null} fastPeriod
	 * @param {Number|Null} slowPeriod
	 * @param {Number|Null} signalPeriod
	 * @returns {Promise<Array>}
	 */
	macd(symbol, interval, timePeriod, seriesType, fastPeriod, slowPeriod, signalPeriod) {
		return this._technical("MACD", symbol, interval, timePeriod, seriesType, [
			{
				key: "fastperiod",
				val: fastPeriod !== null ? fastPeriod : 12
			},
			{
				key: "slowperiod",
				val: slowPeriod !== null ? fastPeriod : 26
			},
			{
				key: "signalperiod",
				val: signalPeriod !== null ? signalPeriod : 9
			}
		]);
	}

	/**
	 * Returns an array of moving average convergence / divergence values with controllable moving average type for the equity specified.
	 * http://www.investopedia.com/articles/forex/05/macddiverge.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @param {Number|Null} fastPeriod
	 * @param {Number|Null} slowPeriod
	 * @param {Number|Null} signalPeriod
	 * @param {Number|Null} fastMaType - Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA).
	 * @param {Number|Null} slowMaType - Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA).
	 * @param {Number|Null} signalMaType - Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA).
	 * @returns {Promise<Array>}
	 */
	macd(symbol, interval, timePeriod, seriesType, fastPeriod, slowPeriod, signalPeriod, fastMaType, slowMaType, signalMaType) {
		return this._technical("MACD", symbol, interval, timePeriod, seriesType, [
			{
				key: "fastperiod",
				val: fastPeriod !== null ? fastPeriod : 12
			},
			{
				key: "slowperiod",
				val: slowPeriod !== null ? fastPeriod : 26
			},
			{
				key: "signalperiod",
				val: signalPeriod !== null ? signalPeriod : 9
			},
			{
				key: "fastmatype",
				val: fastMaType !== null ? fastMaType : 0
			},
			{
				key: "slowmatype",
				val: slowMaType !== null ? slowMaType : 0
			},
			{
				key: "signalmatype",
				val: signalMaType !== null ? signalMaType : 0
			}
		]);
	}

	/**
	 * Returns an array of stochastic oscillators for the equity specified.
	 * http://www.investopedia.com/university/indicator_oscillator/ind_osc8.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @param {Number|Null} fastKPeriod
	 * @param {Number|Null} slowKPeriod
	 * @param {Number|Null} slowDPeriod
	 * @param {Number|Null} slowKmaType - Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA).
	 * @param {Number|Null} slowDmaType - Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA).
	 * @returns {Promise<Array>}
	 */
	stoch(symbol, interval, timePeriod, seriesType, fastKPeriod, slowKPeriod, slowDPeriod, slowKmaType, slowDmaType) {
		return this._technical("STOCH", symbol, interval, timePeriod, seriesType, [
			{
				key: "fastkperiod",
				val: fastKPeriod !== null ? fastKPeriod : 12
			},
			{
				key: "slowkperiod",
				val: slowKPeriod !== null ? slowKPeriod : 26
			},
			{
				key: "slowdperiod",
				val: slowDPeriod !== null ? slowDPeriod : 9
			},
			{
				key: "slowkmatype",
				val: slowKmaType !== null ? slowKmaType : 0
			},
			{
				key: "slowdmatype",
				val: slowDmaType !== null ? slowDmaType : 0
			}
		]);
	}

	/**
	 * Returns an array of stochastic fast oscillators for the equity specified.
	 * http://www.investopedia.com/university/indicator_oscillator/ind_osc8.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @param {Number|Null} fastKPeriod
	 * @param {Number|Null} fastDPeriod
	 * @param {Number|Null} fastDmaType - Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA).
	 * @returns {Promise<Array>}
	 */
	stochf(symbol, interval, timePeriod, seriesType, fastKPeriod, fastDPeriod, fastDmaType) {
		return this._technical("STOCHF", symbol, interval, timePeriod, seriesType, [
			{
				key: "fastkperiod",
				val: fastKPeriod !== null ? fastKPeriod : 12
			},
			{
				key: "fastdperiod",
				val: fastDPeriod !== null ? fastDPeriod : 26
			},
			{
				key: "fastdmatype",
				val: fastDmaType !== null ? fastDmaType : 9
			}
		]);
	}

	/**
	 * Returns an array of relative strength index values for the equity specified.
	 * http://www.investopedia.com/articles/technical/071601.asp
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @returns {Promise<Array>}
	 */
	rsi(symbol, interval, timePeriod, seriesType) {
		return this._technical("RSI", symbol, interval, timePeriod, seriesType);
	}

	/**
	 * Returns an array of stochastic relative strength index values for the equity specified.
	 * http://www.fmlabs.com/reference/default.htm?url=StochRSI.htm
	 * @param {String} symbol
	 * @param {String} interval - Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
	 * @param {Number} timePeriod - Number of data points used to calculate each moving average value. Positive integers are accepted.
	 * @param {String} seriesType - What to base the SMA on: open, high, low, close
	 * @param {Number|Null} fastKPeriod
	 * @param {Number|Null} fastDPeriod
	 * @param {Number|Null} fastDmaType - Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA).
	 * @returns {Promise<Array>}
	 */
	stochRSI(symbol, interval, timePeriod, seriesType, fastKPeriod, fastDPeriod, fastDmaType) {
		return this._technical("STOCHRSI", symbol, interval, timePeriod, seriesType, [
			{
				key: "fastkperiod",
				val: fastKPeriod !== null ? fastKPeriod : 12
			},
			{
				key: "fastdperiod",
				val: fastDPeriod !== null ? fastDPeriod : 26
			},
			{
				key: "fastdmatype",
				val: fastDmaType !== null ? fastDmaType : 9
			}
		]);
	}

}

module.exports = AlphaVantage;