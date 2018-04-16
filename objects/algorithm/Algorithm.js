class Algorithm {

	// Conditionals (if this function is true, then do this function) at specified intervals
	// EOD and open

	constructor(f) {
		this.function = f;
	}

	/**
	 * Identifies whether to be in a long position, short position, or neither.
	 * @param {Array<Quote>} quoteArray
	 * @returns {Boolean}
	 */
	check(quoteArray) {
		return this.function(quoteArray);
	}

}