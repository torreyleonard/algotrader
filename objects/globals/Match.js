class Match {
	/**
	 * Creats a AlphaVantage Match instance
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @constructor
	 * @param {Object} object
	 * @property {String} "1. symbol"
	 * @property {String} "2. name"
	 * @property {String} "3. type"
	 * @property {String} "4. region"
	 * @property {String} "5. marketOpen"
	 * @property {String} "6. marketCloes"
	 * @property {String} "7. timezone"
	 * @property {String} "8. currency"
	 * @property {Number} "9. matchScore"
	 */
	constructor(object) {
		this.symbol = object['1. symbol'];
		this.name = object['2. name'];
		this.type = object['3. type'];
		this.region = object['4. region'];
		this.marketOpen = object['5. marketOpen'];
		this.marketClose = object['6. marketClose'];
		this.timezone = object['7. timezone'];
		this.currency = object['8. currency'];
		this.matchScore = Number(object['9. matchScore']);
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getSymbol() {
		return this.symbol;
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getName() {
		return this.name;
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getType() {
		return this.type;
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getRegion() {
		return this.region;
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getMarketOpen() {
		return this.marketOpen;
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getMarketClose() {
		return this.marketClose;
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getTimezone() {
		return this.timezone;
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getCurrency() {
		return this.currency;
	}

	/**
	 * @author Nicklas Laine Overgaard <https://github.com/nover>
	 * @returns {String}
	 */
	getMatchScore() {
		return this.matchScore;
	}
}

module.exports = Match;
