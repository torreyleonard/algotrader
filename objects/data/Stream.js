const LibraryError = require('../globals/LibraryError');
const News = require('./News');
const Quote = require('../globals/Quote');
const EventEmitter = require('events');
const request = require('request');
const socket = require('socket.io-client');

/**
 * An extension of the Node.js EventEmitter that sends Quote and News objects as they arrive.
 * @event Stream#quote
 * @type {Quote}
 * @event Stream#news
 * @type {News}
 * @event Stream#iex
 * @type {Object}
 */
class Stream extends EventEmitter {

	/**
	 * Creates a new Stream class.
	 * @param {Array} symbols
	 * @param {Object|Null} options
	 * @property {Boolean} iex - Whether to include real time IEX data in stream
	 * @property {String} iexType - Which endpoint to use for IEX stream (tops, last, hist, deep, book, etc. See: https://iextrading.com/developer/docs/#iex-market-data)
	 * @property {Boolean} news - Whether to include news headlines in the stream.
	 * @property {Boolean} allHeadlines - If true, all U.S. business headlines will be sent in the stream. If false, only news pertaining to the given symbols will be outputted.
	 * @property {String} newsApiKey - If 'includeNews' is yes, this should be your API key from https://newsapi.org/register.
	 */
	constructor(symbols, options) {
		super();
		this.symbols = symbols;
		if (options) {
			this.iex = Boolean(options.iex) || false;
			this.iexType = String(options.iexType) || "tops";
			this.news = Boolean(options.news) || false;
			this.allHeadlines = Boolean(options.allHeadlines) || false;
			this.newsApiKey = String(options.newsApiKey) || false;
			this.newsArray = [];
		}
	}

	/**
	 * Start the streaming class.
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
			if (response.statusCode === 404) _this.emit('error', new LibraryError("Yahoo Finance streamer responded with status code: 404.\n\tThis is typically a result of an invalid equity symbol in the query."));
			else if (response.statusCode !== 200) _this.emit('error', new LibraryError("Yahoo Finance streamer responded with status code: " + response.statusCode));
			else _this.emit('response', response);
		}).on('data', data => {
			try {
				let input = data.toString().split('yfs_u1f(');
				input.shift();
				input.forEach(i => {
					const quote = _this._createQuote(i);
					_this.emit('quote', quote);
					if (_this.news) {
						let options = {
							country: "us",
							pageSize: 100,
						};
						if (!_this.allHeadlines) options.q = quote.getSymbol();
						else options.category = "business";
						News.getHeadlines(_this.newsApiKey, options).then(array => {
							array.forEach(news => {
								if (_this.newsArray.indexOf(news) === -1) {
									_this.emit('news', news);
									_this.newsArray.push(news);
								}
							})
						}).catch(error => _this.emit('error', new LibraryError(error)));
					}
				});
			} catch (error) {
				_this.emit('error', error);
			}
		});
		if (_this.iex) {
			_this.socket = socket("https://ws-api.iextrading.com/1.0/" + _this.iexType);
			_this.socket.on('connect', () => {
				_this.socket.emit('subscribe', _this.symbols.join(','));
			});
			_this.socket.on('message', data => {
				_this.emit('iex', data);
			});
		}
	}

	/**
	 * Stop the streaming class.
	 */
	stop() {
		this.request.abort();
		if(this.iex){
			this.socket.disconnect();
		}
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

		let quote = {
			symbol: symbol,
			date: new Date(),
			source: "Yahoo Finance",
			price: {
				last: Number(object.priceRealTimeAfterHours) || Number(object.priceRealTime) || Number(object.lastSalePrice),
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
			original: json
		};

		if (object.volume) quote.price.volume = Number(object.volume.replace(/,/g, ''));
		if (object.volume2) quote.price.volume = Number(object.volume2.replace(/,/g, ''));

		return new Quote(quote);

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