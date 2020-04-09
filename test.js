/**
 * Algotrader - Tests
 * @author Torrey Leonard
 * @licence Apache-2.0
 */

const test = require('ava');
const algotrader = require('./index');

/**
 * Broker Library
 */

// Robinhood

const Robinhood = algotrader.Robinhood;
const Instrument = Robinhood.Instrument;
const Fundamentals = Robinhood.Fundamentals;
const Market = Robinhood.Market;

test('broker | robinhood > get instrument', t => {
	return Instrument.getBySymbol("MCD").then(res => {
		t.true(res.constructor.name === "Instrument");
	}).catch(error => t.fail(error));
});

test('broker | robinhood > get top moving instruments', t => {
	return Instrument.getTopMoving("up").then(res => {
		t.true(res.length > 0 && res[0].constructor.name === "Instrument");
	}).catch(error => t.fail(error));
});

test('broker | robinhood > get most popular instruments', t => {
	return Instrument.getMostPopular().then(res => {
		t.true(res.length > 0 && res[0].constructor.name === "Instrument");
	}).catch(error => t.fail(error));
});

test('broker | robinhood > get quote', t => {
	return Instrument.getBySymbol("CMCSA").then(res => {
		return res.getQuote().then(quote => {
			t.true(quote.constructor.name === "Quote");
		}).catch(error => t.fail(error));
	}).catch(error => t.fail(error));
});

test('broker | robinhood > get fundamentals', t => {
	return Fundamentals.getBySymbol("CRM").then(res => {
		t.true(res.constructor.name === "Fundamentals");
	}).catch(error => t.fail(error));
});

test('broker | robinhood > get market', t => {
	return Market.getByMIC("XNYS").then(res => {
		t.true(res.constructor.name === "Market");
	}).catch(error => t.fail(error));
});

test('broker | robinhood > get market hours', t => {
	return Market.getByMIC("XNYS").then(res => {
		return res.getNextOpen().then(res => {
			t.true(res instanceof Date);
		}).catch(error => t.fail(error));
	}).catch(error => t.fail(error));
});

/**
 * Data Library
 */

// Query

const Query = algotrader.Data.Query;

test('data | query > search', t => {
	return Query.search("Hewlett Packard").then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

test('data | query > get top gainers', t => {
	return Query.getTopGainers(5).then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

test('data | query > get highest volume', t => {
	return Query.getHighestVolume(5).then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

test('data | query > get highest open interest', t => {
	return Query.getHighestOpenInterest(5).then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

test('data | query > get top ETFs', t => {
	return Query.getTopETFs(5).then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

test('data | query > get similar', t => {
	return Query.getSimilar("DPS").then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

test('data | query > get trending symbols', t => {
	return Query.getTrendingSymbols(5).then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

test('data | query > get earnings', t => {
	return Query.getEarnings(5).then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

test('data | query > get earnings by symbol', t => {
	return Query.getEarningsBySymbol("BAC").then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

// Stream

const Stream = algotrader.Data.Stream;

test('data | stream > start stream', t => {
	return new Promise(resolve => {
		const s = new Stream([ "EXC", "MET", "HAS", "ATVI", "PEP" ]);
		s.start();
		s.on('quote', quote => {
			t.true(quote.constructor.name === "Quote");
			resolve(s.stop());
		});
		s.on('error', error => t.fail(error));
	})
});

// Yahoo

const Yahoo = algotrader.Data.Yahoo;

test('data | yahoo > get quote', t => {
	return Yahoo.getQuotes("MMM", "5d", "1m", false).then(res => {
		t.true(res.length > 0 && res[0].constructor.name === "Quote");
	}).catch(error => t.fail(error));
});

test('data | yahoo > get options chain', t => {
	return Yahoo.getOptionsChain("LUV").then(res => {
		t.true(res.constructor.name === "OptionsChain");
	}).catch(error => t.fail(error));
});

// Nasdaq

const Nasdaq = algotrader.Data.Nasdaq;

test('data | nasdaq > get listings', t => {
	return Nasdaq.getTraded().then(res => {
		t.true(res.length > 0);
	}).catch(error => t.fail(error));
});

// IEX

const IEX = algotrader.Data.IEX;

Object.getOwnPropertyNames(IEX).forEach(f => {
	if (['length', 'prototype', '_request', 'getBatchQuotes', 'name'].indexOf(f) === -1)
		test('data | IEX > ' + f, t => {
			return IEX[f]("AAPL").then(res => {
				t.true(res !== undefined)
			}).catch(error => t.fail(error));
		});
});


// AlphaVantage
const AlphaVantage = algotrader.Data.AlphaVantage;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY	|| 'demo';
test('data | alpha-vantage > search', t => {
	const av = new AlphaVantage(ALPHA_VANTAGE_API_KEY);

	return av.search('microsoft').then(data => {
		t.true(data.length > 0);

		for (const item of data) {
			t.truthy(item.symbol);
			t.truthy(item.name);
			t.truthy(item.type);
			t.truthy(item.region);
			t.truthy(item.marketOpen);
			t.truthy(item.marketClose);
			t.truthy(item.timezone);
			t.truthy(item.currency);
			t.truthy(item.matchScore);
		}
	});
});

/**
 * Algorithm Library
 */

// Scheduler

const Scheduler = algotrader.Algorithm.Scheduler;

test('algorithm | scheduler > create and cancel job', t => {
	return Scheduler.onMarketOpen(0, () => { }).then(job => {
		t.true(job.constructor.name === "Job");
		Scheduler.cancel(job);
	}).catch(error => t.fail(error));
});
