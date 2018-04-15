const EventEmitter = require('events');
const Quote = require('../globals/Quote');
const request = require('request');

class Stream extends EventEmitter {

	/**
	 * Creates a new Stream class.
	 * @param {Array} symbols
	 */
	constructor(symbols) {
		super();
		this.symbols = symbols;
	}

	/**
	 * Start the streaming class.
	 *
	 * The event will emit three events: error (Error object), response (JSON from request module), and quote (Quote object).
	 * Access via .on('data', function), etc.
	 */
	start() {
		const _this = this;
		this.request = request.get({
			uri: "https://streamerapi.finance.yahoo.com/streamer/1.0",
			qs: {
				s: _this.symbols.join(','),
				k: _this._getYahooKeys().join(','),
				callback: 'parent.yfs_u1f',
				mktmcb: 'parent.yfs_mktmcb',
				gencallback: 'parent.yfs_gencb',
				mu: '1',
				lang: 'en-US',
				region: 'US',
				localize: '0'
			},
			qsStringifyOptions: {
				encode: false
			},
			forever: true
		}).on('error', error => {
			_this.emit('error', error)
		}).on('response', response => {
			if (response.statusCode === 404) _this.emit('error', new Error("Yahoo Finance streamer responded with status code: 404.\nThis is typically a result of an invalid equity symbol in the query."));
			else if (response.statusCode !== 200) _this.emit('error', new Error("Yahoo Finance streamer responded with status code: " + response.statusCode));
			else _this.emit('response', response);
		}).on('data', data => {
			try {
				let input = data.toString().split('yfs_u1f(');
				input.shift();
				input.forEach(i => {
					const quote = _this._createQuote(i);
					_this.emit('quote', quote);
				});
			} catch (error) {
				_this.emit('error', error);
			}
		})
	}

	/**
	 * Stop the streaming class.
	 */
	stop() {
		this.request.abort();
	}

	_createQuote(input) {
		const yahooKeys = {
			a00: 'ask',
			a50: 'askSize',
			b00: 'bid',
			b60: 'bidSize',
			c10: 'change',
			c63: 'changeRealTime',
			c64: 'disputedChangeRealTimeAfterHours',
			c85: 'changeRealTimeAfterHours',
			c86: 'percentChangeRealTimeAfterHours',
			g53: 'dayLow',
			h53: 'dayHigh',
			j10: 'marketCap',
			l84: 'priceRealTime',
			l86: 'priceRealTimeAfterHours',
			p20: 'percentChange',
			p43: 'percentChangeRealTime',
			p44: 'percentChangeRealTimeAfterHours',
			t53: 'disputedTimestampForCommodities',
			t54: 'disputedTimestampForStocks',
			v53: 'volume',
			v00: 'volume2',
			l10: 'lastSalePrice',
			t10: 'lastSaleTime',
			l90: 'ecnQuoteLastValue'
		};
		for (const key in yahooKeys) {
			input = input.replace(key, '"' + yahooKeys[key] + '"');
		}
		const json = JSON.parse(input.split(');')[0]);

		const symbol = Object.keys(json)[0];
		const object = json[symbol];

		return new Quote({
			symbol: symbol,
			date: new Date(),
			source: "Yahoo Finance",
			price: {
				last: Number(object.priceRealTimeAfterHours) || Number(object.priceRealTime) || Number(object.lastSalePrice),
				volume: Number(object.volume.replace(/,/g, '')) || Number(object.volume2.replace(/,/g, '')),
				high: Number(object.dayHigh),
				low: Number(object.dayLow)
			},
			dom: {
				bid: {
					price: Number(object.bid),
					size: Number(object.bidSize)
				},
				ask: {
					price: Number(object.ask),
					size: Number(object.askSize)
				}
			},
			meta: {
				change: object.change || object.changeRealTime,
				percentChange: object.percentChange || object.percentChangeRealTime,
				marketCap: object.marketCap
			},
			original: JSON.stringify(json)
		})

	}

	_getYahooKeys() {
		const keys = {
			Ask: 'a00',
			AskSize: 'a50',
			Bid: 'b00',
			BidSize: 'b60',
			Change: 'c10',
			ChangeRealTime: 'c63',
			DisputedChangeRealTimeAfterHours: 'c64',
			ChangeRealTimeAfterHours: 'c85',
			PercentChangeRealTimeAfterHours: 'p44',
			DayLow: 'g53',
			DayHigh: 'h53',
			MarketCap: 'j10',
			PriceRealTime: 'l84',
			PriceRealTimeAfterHours: 'l86',
			PercentChange: 'p20',
			PercentChangeRealTime: 'p43',
			DisputedTimestampForCommodities: 't53',
			DisputedTimestampForStocks: 't54',
			Volume: 'v53',
			Volume2: 'v00',
			LastSalePrice: 'l10',
			LastSaleTime: 't10',
			EcnQuoteLastValue: 'l90',
		};
		// return [
		// 	keys.Ask,
		// 	keys.AskSize,
		// 	keys.Bid,
		// 	keys.BidSize,
		// 	keys.Change,
		// 	keys.Volume,
		// 	keys.Volume2,
		// 	keys.PriceRealTime,
		// 	keys.PriceRealTimeAfterHours,
		// 	keys.LastSalePrice,
		// 	keys.EcnQuoteLastValue,
		// 	keys.LastSaleTime,
		// 	keys.DisputedTimestampForStocks,
		// 	keys.MarketCap
		// ]
		return [
			'a00', 'a50', 'b00', 'b60', 'c10', 'c63', 'c64', 'c85', 'p44', 'g53', 'h53', 'j10', 'l84', 'l86', 'p20', 'p43', 't53', 't54', 'v53', 'v00', 'l10', 't10', 'l90'
		]
	}

}

module.exports = Stream;