const algotrader = require('./index');

const Query = algotrader.Data.Query;

// Query.getTopETFs(5).then(res => {
// 	console.log(res);
// })

// const s = new Stream(["JPY=X"]);
// s.start();
// s.on('data', data => {
// 	console.log(data["JPY=X"].bid);
// 	console.log(data["JPY=X"].ask);
// }).on('error', error => {
// 	console.error(error);
// });
//
// const robinhood = require('./index').Robinhood;
// const Instrument = robinhood.Instrument;
// const User = robinhood.User;
// const Quote = robinhood.Quote;
// const Order = robinhood.Order;
//
// Instrument.getBySymbol("TWTR").then(async twtrInstrument => {
// 	const myOrder = new Order(null, myAccount, twtrInstrument, await twtrInstrument.getQuote();, "market", "GFD", "immediate", null, "10", "buy", true, false);
// 	myOrder.submit().then(res => {
//
// 	}).catch(error => {
//
// 	})
// });

const Stream = algotrader.Data.Stream;

const myStream = new Stream(["PG", "DPS", "ULTA", "DIN", "ETSY"]);
myStream.start();

myStream
	.on('data', data => {
		// { ETSY:
		// { lastSalePrice: '30.54',
		// 	change: '+0.34',
		// 	percentChange: '+1.13',
		// 	volume2: '1,337,781',
		// 	askSize: '500',
		// 	bidSize: '600',
		// 	lastSaleTime: '1523548866' } }
	})
	.on('response', res => {
		// Returns a response object from the request module. Useful for debugging.
	})
	.on('error', error => {
		// Returns an error if the stream failed to start.
	});