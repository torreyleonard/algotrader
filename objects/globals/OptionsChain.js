const _ = require('lodash');

class OptionsChain {

	/**
	 * Creates a new OptionsChain object.
	 * @param {Array} array
	 */
	constructor(array) {
		this.array = _.sortBy(array, "date");
	}

	// PRIVATE

	/**
	 * @private
	 */
	_getOption(date, strike, side) {
		if (side !== "call" && side !== "put") return new Error("Parameter 'side' must be either 'call' or 'put'");
		else {
			let chain = this.getByExpirationDate(date);
			if (chain !== undefined) {
				chain = chain[side + "s"][strike];
				if (chain !== undefined) return chain;
				else return new Error("Invalid strike price provided.");
			} else return new Error("Invalid date provided.");
		}
	}

	/**
	 * @private
	 */
	_getClosest(numberArray, target) {
		return numberArray.reduce((prev, curr) => {
			return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
		})
	}

	// GET

	/**
	 * Returns an array of all expiration dates for the OptionsChain object.
	 * @returns {Array<Date>}
	 */
	getExpirationDates() {
		let array = [];
		this.array.forEach(o => {
			array.push(o.date);
		});
		return array;
	}

	/**
	 * Returns an array of all strike prices for the OptionsChain object.
	 * @param {Date} date
	 * @param {String} side - put, call
	 * @returns {Array<Number>|Error}
	 */
	getStrikePrices(date, side) {
		if (side !== "call" && side !== "put") return new Error("Parameter 'side' must be either 'call' or 'put'");
		else {
			let array = [];
			let chain = this.getByExpirationDate(date);
			if (chain !== undefined) {
				chain = chain[side + "s"];
				if (chain !== undefined) {
					for (const key in chain) array.push(key);
					return array;
				} else return new Error("Invalid strike price provided.");
			} else return new Error("Invalid date provided.");
		}
	}

	/**
	 * Returns an options chain for the given date.
	 * @param {Date} date
	 * @returns {Object}
	 */
	getByExpirationDate(date) {
		return this.array.find(o => o.date === date);
	}

	// Get nearest

	/**
	 * Returns the nearest strike price to the given price target.
	 * @param {Date} date - Expiration date to query.
	 * @param {String} side - Strike price to query.
	 * @param {Number} priceTarget
	 * @returns {Number|Error}
	 */
	getNearestStrikePrice(date, side, priceTarget) {
		if (side !== "call" && side !== "put") return new Error("Parameter 'side' must be either 'call' or 'put'");
		else return this._getClosest(this.getStrikePrices(date, side), priceTarget);
	}

	/**
	 * Returns the nearest expiration date to the given date.
	 * @param {Date} targetDate
	 * @returns {Date}
	 */
	getNearestExpirationDate(targetDate) {
		let timestamps = [];
		this.getExpirationDates().forEach(d => {
			timestamps.push(d.getTime());
		});
		return new Date(this._getClosest(timestamps, targetDate.getTime()));
	}

	// Get specific option data

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query.
	 * @param {String} side - put, call
	 * @returns {Number}
	 */
	getVolume(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.volume;
	}

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query
	 * @param {String} side - put, call
	 * @returns {Number}
	 */
	getOpenInterest(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.openInterest;
	}

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query
	 * @param {String} side - put, call
	 * @returns {Number}
	 */
	getLastPrice(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.lastPrice;
	}

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query
	 * @param {String} side - put, call
	 * @returns {Number}
	 */
	getBid(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.bid;
	}

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query
	 * @param {String} side - put, call
	 * @returns {Number}
	 */
	getAsk(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.ask;
	}

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query
	 * @param {String} side - put, call
	 * @returns {Number}
	 */
	getChange(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.change;
	}

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query
	 * @param {String} side - put, call
	 * @returns {Date}
	 */
	getLastTradeDate(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.lastTradeDate;
	}

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query
	 * @param {String} side - put, call
	 * @returns {Number}
	 */
	getImpliedVolatility(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.impliedVolatility;
	}

	/**
	 * @param {Date} date - Expiration date to query.
	 * @param {Number} strike - Strike price to query
	 * @param {String} side - put, call
	 * @returns {Boolean}
	 */
	isInTheMoney(date, strike, side) {
		const option = this._getOption(date, strike, side);
		if (option instanceof Error) return option;
		else return option.inTheMoney;
	}

}

module.exports = OptionsChain;