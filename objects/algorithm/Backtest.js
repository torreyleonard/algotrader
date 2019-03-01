const Yahoo = require('../data/Yahoo');

/**
 * Incomplete
 */
class Backtest {

	constructor(symbol, algorithm) {
		this.symbol = symbol;
		this.algorithm = algorithm;
	}

	/**
	 * Runs a backtest on the given algorithm.
	 * @param minute
	 * @returns {Promise<Object>}
	 */
	run(minute) {
		return Yahoo.getQuotes(this.symbol, "1y", minute ? "1min" : "1d", false).then(quoteArray => {

			let profit = 0;
			let loss = 0;

			let trades = 0;


		})
	}

}