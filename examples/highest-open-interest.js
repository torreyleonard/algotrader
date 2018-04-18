/**
 * Goal
 *  - Five minutes after market open:
 *      - Retrieve options contracts with the highest open interest from Yahoo! Finance, filter by calls
 *      - Retrieve the Robinhood user's portfolio and get their cash balance
 *      - Buy stock in the companies found in the first query
 *  - Five minutes before market close:
 *      - Sell all Robinhood user positions
 *
 * @author Torrey Leonard
 *
 */

// Dependencies

const async = require('async');
const algotrader = require('../index');

const Query = algotrader.Data.Query;
const Scheduler = algotrader.Algorithm.Scheduler;

const Robinhood = algotrader.Robinhood;
const User = Robinhood.User;
const Order = Robinhood.Order;
const Instrument = Robinhood.Instrument;

// Scheduler

Scheduler.onMarketOpen(5 * 60000, open).catch(error => console.error(error));                       // Run every day on market open
Scheduler.onMarketClose(5 * -60000, async () => {                                                   // Run every day on market close

	const myAccount = new Robinhood.User("myUsername", "myPassword");                               // Create and login user
	await myAccount.authenticate();

	const portfolio = myAccount.getPortfolio();                                                     // Get user's portfolio
	portfolio.sellAll();                                                                            // Sell all positions

}).catch(error => console.error(error));

// Function to run daily on market open

async function open() {

	const options = await Query.getHighestOpenInterest(100);

	let instruments = [];

	async.forEachOf(options, (o, key, callback) => {
		if ( o.shortName.indexOf("call") !== -1 && o.underlyingSymbol.indexOf("^") === -1 ) {       // Find calls, filter out indices

			Instrument.getBySymbol(o.underlyingSymbol).then(ins => {                                // Get Robinhood Instrument for each symbol

				instruments.push(ins);

			}).catch(error => console.error(error));

		} else callback();
	}, async () => {

		const myAccount = new Robinhood.User("myUsername", "myPassword");                           // Create and login user
		await myAccount.authenticate();

		const buyingPower = await myAccount.getBuyingPower();                                       // Get buying power for the user

		instruments.forEach(ins => {
			ins.getQuote().then(quote => {                                                          // Get quote for each instrument

				const order = new Order(myAccount, {                                                // Create a new order using available buying power
					instrument: ins,
					quote: quote,
					type: "market",
					timeInForce: "gfd",
					trigger: "immediate",
					quantity: (buyingPower / quote.getLast()) - 1,                                  // Greatest possible quantity, minus 1
					side: "buy"
				});
				order.submit();

			})
		})

	});

}