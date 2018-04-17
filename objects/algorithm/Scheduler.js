const Market = require('../robinhood/Market');
const schedule = require('node-schedule');

class Scheduler {

	/**
	 * Runs every day on market open.
	 * @param {Number} offset - The offset, in milliseconds, from market open to run the algorithm. Negative is before, positive is after.
	 * @param {Function} f - The function to run.
	 */
	static onMarketOpen(offset, f) {
		return Market.getByMIC("XNYS").then(nyse => {
			return nyse.getNextOpen().then(next => {
				const date = new Date(next.getTime() + offset);
				schedule.scheduleJob(date, f);
				return date;
			})
		});
	}

	/**
	 * Runs every day on market close.
	 * @param {Number} offset - The offset, in milliseconds, from market close to run the algorithm. Negative is before, positive is after.
	 * @param {Function} f - The function to run.
	 */
	static onMarketClose(offset, f) {
		return Market.getByMIC("XNYS").then(nyse => {
			return nyse.getNextClose().then(next => {
				const date = new Date(next.getTime() + offset);
				schedule.scheduleJob(date, f);
				return date;
			})
		});
	}

	/**
	 * Runs every 'x' minutes while the market is open.
	 * @param {Number} minutes
	 * @param {Boolean} extended - Whether to run during extended trading hours.
	 * @param {Function} f - The function to run.
	 */
	static every(minutes, extended, f) {
		schedule.scheduleJob("*/" + minutes + " * * * 1-5", () => {
			Market.getByMIC("XNYS").then(nyse => {
				if (nyse.isOpenNow()) f();
				else if (extended && nyse.isExtendedOpenNow()) f();
			})
		});
	}

}

module.exports = Scheduler;