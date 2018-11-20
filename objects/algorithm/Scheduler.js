const Market = require('../broker/robinhood/Market');
const schedule = require('node-schedule');

/**
 * Used to run functions at specified intervals or times of day.
 */
class Scheduler {

	/**
	 * Runs every day on market open.
	 * @param {Number} offset - The offset, in milliseconds, from market open to run the algorithm. Negative is before, positive is after.
	 * @param {Function} f - The function to run.
	 * @returns {Promise<schedule>}
	 */
	static onMarketOpen(offset, f) {
		return Market.getByMIC("XNYS").then(nyse => {
			return nyse.getNextOpen().then(next => {
				const date = new Date(next.getTime() + offset);
				return schedule.scheduleJob(date, f);;
			})
		});
	}

	/**
	 * Runs every day on market close.
	 * @param {Number} offset - The offset, in milliseconds, from market close to run the algorithm. Negative is before, positive is after.
	 * @param {Function} f - The function to run.
	 * @returns {Promise<schedule>}
	 */
	static onMarketClose(offset, f) {
		return Market.getByMIC("XNYS").then(nyse => {
			return nyse.getNextClose().then(next => {
				const date = new Date(next.getTime() + offset);
				schedule.scheduleJob(date, f);
				return schedule.scheduleJob(date, f);;
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

	/**
	 * Cancels a job.
	 * @param {schedule} schedule
	 */
	static cancel(schedule) {
		schedule.cancel();
	}

	/**
	 * Returns the date of the next invocation of the given job.
	 * @param {schedule} schedule
	 * @returns {Date}
	 */
	static getNext(schedule) {
		return schedule.nextInvocation();
	}

}

module.exports = Scheduler;