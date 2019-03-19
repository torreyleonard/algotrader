const Market = require('../broker/robinhood/Market');
const schedule = require('node-schedule');

/**
 * Used to run functions at specified intervals or times of day.
 */
class Scheduler {

	/**
	 * Creates a new scheduled task
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {Function} f
	 */
	constructor(f) {
		this.f = f;
		this.job = null;
	}

	/**
	 * Runs every day on market open.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {Number} offset - The offset, in milliseconds, from market open to run the algorithm. Negative is before, positive is after.
	 * @returns {Promise<Date>} - Date object of next invocation.
	 */
	onMarketOpen(offset) {
		const _this = this;
		if (!offset) offset = 0;
		return new Promise((resolve, reject) => {
			if (_this.job !== null) reject(new Error("You must cancel this job before scheduling it again!"));
			else Market.getByMIC("XNYS").then(nyse => {
				nyse.getNextOpen().then(next => {
					const date = new Date(next.getTime() + offset);
					_this.job = schedule.scheduleJob(date, _this.f);
					resolve(_this.job.nextInvocation().toDate());
				})
			});
		})
	}

	/**
	 * Runs every day on market close.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {Number} offset - The offset, in milliseconds, from market close to run the algorithm. Negative is before, positive is after.
	 * @returns {Promise<schedule>}
	 */
	onMarketClose(offset) {
		const _this = this;
		if (!offset) offset = 0;
		return new Promise((resolve, reject) => {
			if (_this.job !== null) reject(new Error("You must cancel this job before scheduling it again!"));
			else Market.getByMIC("XNYS").then(nyse => {
				nyse.getNextClose().then(next => {
					const date = new Date(next.getTime() + offset);
					_this.job = schedule.scheduleJob(date, _this.f);
					resolve(_this.job.nextInvocation().toDate());
				})
			});
		});
	}

	/**
	 * Runs every 'x' minutes while the market is open.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {Number} minutes
	 * @param {Boolean} extended - Whether to run during extended trading hours.
	 */
	every(minutes, extended) {
		const _this = this;
		return new Promise((resolve, reject) => {
			if (_this.job !== null) reject(new Error("You must cancel this job before scheduling it again!"));
			else {
				_this.job = schedule.scheduleJob("*/" + minutes + " * * * 1-5", () => {
					Market.getByMIC("XNYS").then(nyse => {
						if (nyse.isOpenNow()) _this.f();
						else if (extended && nyse.isExtendedOpenNow()) _this.f();
					})
				});
				resolve(_this.job.nextInvocation().toDate());
			}
		});
	}

	/**
	 * Cancels a job.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 */
	cancel() {
		if (this.job === null) return new Error("This job has not been scheduled yet.");
		else {
			this.job.cancel();
			this.job = null;
		}
	}

	/**
	 * Returns the date of the next invocation of the given job.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Date|Error}
	 */
	getNext() {
		if (this.job === null) return new Error("This job has not been scheduled yet.");
		else return this.job.nextInvocation();
	}

}

module.exports = Scheduler;