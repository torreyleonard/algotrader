const Robinhood = require('./Robinhood');

class Portfolio extends Robinhood {

	/**
	 * Creates a new Portfolio object.
	 * @param array
	 */
	constructor(array) {
		if (!array instanceof Array) throw new Error("Parameter 'array' must be an array.");
		else {
			super();
			this.array = [];
			const _this = this;
			array.forEach(p => {
				_this.array.push({
					symbol: String(p.InstrumentObject.getSymbol()),
					quantity: Number(p.quantity),
					averageBuy: {
						price: Number(p.average_buy_price),
						pending: Number(p.pending_average_buy_price),
						intraday: Number(p.intraday_average_buy_price)
					},
					dates: {
						originalPurchase: new Date(p.created_at),
						lastTrade: new Date(p.updated_at)
					},
					sharesHeld: {
						stockGrants: Number(p.shares_held_for_stock_grants),
						optionsEvents: Number(p.shares_held_for_options_events),
						optionsCollateral: Number(p.shares_held_for_options_collateral),
						forBuys: Number(p.shares_held_for_buys),
						forSells: Number(p.shares_held_for_sells),
						pendingFromOptionsEvents: Number(p.shares_pending_from_options_events)
					},
					InstrumentObject: p.InstrumentObject
				})
			});
		}
	}

	// GET

	/**
	 * Returns an array of all symbols in the user's portfolio.
	 * @returns {Array}
	 */
	getSymbols() {
		let array = [];
		this.array.forEach(p => {
			array.push(p.symbol);
		});
		return array;
	}

	/**
	 * Returns the average buy price for the given symbol.
	 * @param {String} symbol
	 * @returns {Number}
	 */
	getBuyPrice(symbol) {
		return this.getBySymbol(symbol).averageBuy.price;
	}

	/**
	 * Returns the quantity owned of the given symbol.
	 * @param {String} symbol
	 * @returns {Number}
	 */
	getQuantity(symbol) {
		return this.getBySymbol(symbol).quantity;
	}

	/**
	 * Get total shares held for the given symbol.
	 * @param {String} symbol
	 * @returns {Number}
	 */
	getSharesHeld(symbol) {
		const held = this.getBySymbol(symbol).sharesHeld;
		return held.stockGrants + held.optionsEvents + held.optionsCollateral + held.forBuys + held.forSells + held.pendingFromOptionsEvents;
	}

	/**
	 * Returns the date of original purchase for the given symbol.
	 * @param {String} symbol
	 * @returns {Date}
	 */
	getPurchaseDate(symbol) {
		return this.getBySymbol(symbol).dates.originalPurchase;
	}

	/**
	 * Returns the date of last trade for the given symbol.
	 * @param {String} symbol
	 * @returns {Date}
	 */
	getLastTradeDate(symbol) {
		return this.getBySymbol(symbol).dates.lastTrade;
	}

	// FILTER / FIND

	/**
	 * Returns an object containing the user's position in the given symbol.
	 * @param {String} symbol
	 * @returns {Object}
	 */
	getBySymbol(symbol) {
		return this.array.find(p => p.symbol === symbol);
	}

	/**
	 * Returns an array of objects containing the user's positions in the given symbols.
	 * @param {Array} array
	 * @returns {Array}
	 */
	getBySymbols(array) {
		return this.array.filter(p => array.indexOf(p.symbol) !== -1);
	}

	/**
	 * Returns an array of all positions greater than the given amount.
	 * @param {Number} size
	 * @returns {Array}
	 */
	getQuantityGreaterThan(size) {
		return this.array.filter(p => p.quantity > size);
	}

	/**
	 * Returns an array of all positions less than the given amount.
	 * @param {Number} size
	 * @returns {Array}
	 */
	getQuantityLessThan(size) {
		return this.array.filter(p => p.quantity < size);
	}

	/**
	 * Returns an array of all positions equal to than the given amount.
	 * @param {Number} size
	 * @returns {Array}
	 */
	getQuantityEqualTo(size) {
		return this.array.filter(p => p.quantity === size);
	}

	/**
	 * Returns an array of all positions opened after the given date (UTC).
	 * @param {Date} date - Compared with UTC time.
	 * @returns {Array}
	 */
	getPurchasedAfter(date) {
		return this.array.filter(p => p.dates["originalPurchase"].getTime() - date.getTime() > 0);
	}

	/**
	 * Returns an array of all positions opened before the given date (UTC).
	 * @param {Date} date - Compared with UTC time.
	 * @returns {Array}
	 */
	getPurchasedBefore(date) {
		return this.array.filter(p => p.dates["originalPurchase"].getTime() - date.getTime() < 0);
	}

	/**
	 * Returns an array of all positions opened on the given date (UTC).
	 * @param {Date} date - Compared with UTC time.
	 * @returns {Array}
	 */
	getPurchasedOn(date) {
		return this.array.filter(p =>
			p.dates["originalPurchase"].getFullYear() === date.getFullYear() &&
			p.dates["originalPurchase"].getMonth() === date.getMonth() &&
			p.dates["originalPurchase"].getDate() === date.getDate()
		);
	}

	/**
	 * Returns an array of all positions with an average buy price greater than the given amount.
	 * @param {Number} amount
	 * @returns {Array}
	 */
	getPriceGreaterThan(amount) {
		return this.array.filter(p => p.averageBuy.price > amount);
	}

	/**
	 * Returns an array of all positions with an average buy price less than the given amount.
	 * @param {Number} amount
	 * @returns {Array}
	 */
	getPriceLessThan(amount) {
		return this.array.filter(p => p.averageBuy.price < amount);
	}

	/**
	 * Returns an array of all positions with an average buy price equal to the given amount.
	 * @param {Number} amount
	 * @returns {Array}
	 */
	getPriceEqualTo(amount) {
		return this.array.filter(p => p.averageBuy.price === amount);
	}

}

module.exports = Portfolio;