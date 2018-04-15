# Algotrader
#### *Simple algorithmic stock trading for Node.js.*

[![npm package](https://nodei.co/npm/algotrader.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/algotrader/)

[![NPM Version](https://img.shields.io/npm/v/algotrader.svg?style=flat-square)](https://www.npmjs.com/package/algotrader)
[![NPM Downloads](https://img.shields.io/npm/dt/algotrader.svg?style=flat-square)](https://www.npmjs.com/package/algotrader)
[![GitHub Commit](https://img.shields.io/github/last-commit/Ladinn/algotrader.svg?style=flat-square)](https://github.com/Ladinn/algotrader)
[![GitHub Issues](https://img.shields.io/github/issues/Ladinn/algotrader.svg?style=flat-square)](https://github.com/Ladinn/algotrader/issues)
[![Discord](https://img.shields.io/discord/224996786547326976.svg?style=flat-square)](https://discord.gg/Sjyw5eD)

---

### Features
- **Extensive broker library**
	- Easily place orders
	- Retrieve past orders
	- Query a users portfolio
	- Supported brokers:
		- Robinhood
		- TDAmeritrade (in progress)
		- If you'd like to have another broker supported, submit an issue or a pull request
- **Data library**
	- Real time quote data streaming for cryptocurrency, forex, equities
		- Get data on bids, asks, last price, and more from the Yahoo Finance API
	- Up-to-date options data
	- Easily find stocks for various queries
		- Retrieve the day's top gainers
		- Retrieve the day's top losers
		- Get stocks by highest (abnormal) volume
		- Get options contracts by highest open interest
		- And more
	- Get up to the minute news on specified stocks
		- In progress: stream news in real time
	- Get technical indicators from AlphaVantage (in progress)
		- SMA, EMA, RSI, etc.
	- Get fundamentals and balance sheet data (in progress)
		- Assets, debt, liabilities, revenue, earnings, etc.
- **Algorithm library** (in progress)
	- Create algorithms that will automatically place trades based on your criteria
	- Backtest algorithms on past market data
	- Paper (simulated) trade your algorithm to see how it performs in real time

---

### Table of Contents

- [Getting Started](#getting-started)
- Broker Library
	- [Robinhood](#robinhood)
- Data Library
	- [OptionsChain](#optionsChain) (todo)
	- [Query](#query)
	- [Stream](#stream)
	- [News](#news) (todo)
	- [Alpha Vantage](#alpha-vantage)
- Algorithm (todo)

---

### Getting started

Using NPM, you can install Algotrader using the following console command: ```npm i algotrader --save```

Once Algotrader is installed, you can import it into your Node.js project.
```js
const algotrader = require('algotrader');
```
After, you can instantiate any Algotrader library like so:
```js
const Robinhood = algotrader.Robinhood;
const Data = algotrader.Data;
const Algorithm = algotrader.Algorithm; // in progress
```

---

### Robinhood
First, you'll need to create a new [```User```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User) instance and authenticate them.
```js
const robinhood = require('algotrader').Robinhood;
const User = robinhood.User;

const myUser = new User("username", "password");
myUser.authenticate()
	.then(() => {
		// User was authenticated
	})
	.catch(error => {
		// Either the request failed, or Robinhood responded with an error.
        	// (Ex: you don't have internet access or your user credentials were incorrect)
	})
```
Personally, I either store user data as an array in a .json file, then require it into the class, (insecure) or ask for the user's credentials in the console. You should handle this sensitive data in a way that you're comfortable with.

#### Get a user's portfolio
There are a good amount of query functions that you can run on the user's portfolio. Using your [```User```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User) instance, you can grab the portfolio using ``` User.getPortfolio()``` which returns a new [```Portfolio```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Portfolio) object.
```js
myUser.getPortfolio()
	.then(myPortfolio => { // Algotrader retrieved the user's portfolio
		// You can find information on specific symbols
		let myTeslaShares = myPortfolio.getQuantity("TSLA"); // Returns the quantity of shares you own in the given symbol: 10
		let bestDayEver = myPortfolio.getPurchaseDate("SHLD"); // Returns the date (Date object) you purchased the given symbol: 2007-04-17
		// You can find information on the entire portfolio
		let mySymbols = myPortfolio.getSymbols(); // Returns an array of all symbols in the user's portfolio: ['FB', 'AMZN', 'NFLX', 'GOOG']
		let myMoneyMakers = myPortfolio.getQuantityGreaterThan(50); // Returns an array of all positions greater than the given amount: [Object]
		// Along with much more. See the link below to visit the Robinhood portfolio documentation.
	})
	.catch(error => {
		// Either the request failed, or Robinhood responded with an error.
		// (Ex: you don't have internet access or your user credentials were incorrect)
	})
```
For documentation on all portfolio functions, visit the [Robinhood Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Portfolio)

#### Placing an order
Placing an order will require instances of the [```User```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User), [```Instrument```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Instrument), [```Quote```](https://github.com/Ladinn/algotrader/blob/master/docs/GLOBALS.md#quote), and [```Order```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Order) classes.

All orders first require that you grab a new [```Instrument```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Instrument) object which represents, in most cases, a stock or ETF. You can also grab the object from your [```Portfolio```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Portfolio). Then, Robinhood requires that you also submit the stock's market price in the order, so you should retrieve a [```Quote```](https://github.com/Ladinn/algotrader/blob/master/docs/GLOBALS.md#quote) from them on via [```Instrument```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Instrument) object (the origin of the quote doesn't matter, as long as it contains accurate pricing information- so, the quote returned from the [```Stream```](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#Stream) class would also work). You'll then create an object with this and other necessary information to pass as a parameter to a new [```Order```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Order).

The object should contain the following:

- [```Instrument```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Instrument) - The Robinhood instrument you would like to place an order for.
- [```Quote```](https://github.com/Ladinn/algotrader/blob/master/docs/GLOBALS.md#quote) - An updated quote containing the last sale price for the given instrument.
- ```type```
	- ```limit``` - The lowest price to accept in a buy, the highest price in a sell
	- ```market``` - Order executes at the current bid/ask price
- ```timeInForce```
	- ```GFD``` - Good for the day (cancels at market close)
	- ```GTC``` - Good-til-cancelled (active until you cancel it)
	- ```IOC``` - Immediate or cancel (possibly deprecated by Robinhood)
	- ```OPG``` - Market/limit on open (possibly deprecated by Robinhood)
- ```trigger```
	- ```immediate``` - The order is active as soon as it's placed
	- ```stop``` - The order won't be active until the market price crossed your stop price
- ```stopPrice```
	- If ```trigger = stop```, this must be specified
- ```quantity```
	- How many shares should be bought / sold
- ```side```
	- ```buy```
	- ```sell```
- ```extendedHours```
	- ```boolean``` - Whether the order should be allowed to execute when exchanges are closed
- ```overrideDayTradeCheck```
	- ```boolean``` - Whether to override Pattern Day Trader protection (this should definitely be false)

With this in mind, you can place a simple market order for ten shares of Twitter like so:

```js
// ES6
Instrument.getBySymbol("TWTR").then(async twtrInstrument => {
	let twtrQuote = await twtrInstrument.getQuote();
	const myOrder = new Order(user, {
		instrument: twtrInstrument,
		quote: twtrQuote,
		type: "market",
		timeInForce: "gfd",
		trigger: "immediate",
		quantity: 10,
		side: "buy"
	});
	myOrder.submit().then(res => {
		// Order was successful
	}).catch(error => {
		// Either the request failed, or Robinhood responded with an error.
		// (Ex: you don't have internet access or your balance was insufficient)
	});
});
});
```
For documentation on all order functions, visit the [Robinhood Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Order)

---

### Data Library
The data library allows you to retrieve a ton of data on the market as a whole and individual stocks or options. This uses the Yahoo Finance and Alpha Vantage APIs and additional support for other free API's will be added in the future.

I'll only add a few examples here, but for the full documentation visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md)

#### Real time streaming

To stream live quotes from Yahoo Finance, you'll need an array of symbols that you want to monitor. If you only need data on one, just fill the array with that single symbol. The [```Stream```](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#Stream) class is an extension of the Node EventEmitter, so  you can either use ```.on()``` or ```.pipe()``` like other events.

Once the stream starts, a data object for each symbol is immediately received. You will then begin to get real time updates. Note that the data objects streamed by Yahoo aren't always of the same format, so make sure to have a check for ```undefined``` each time you access a key in the object.

```js
const Stream = algotrader.Data.Stream;

const myStream = new Stream(["PG", "DPS", "ULTA", "DIN", "ETSY"]);
myStream.start();

myStream
	.on('quote', quote => {
		// Returns an array of Quote objects. See the link below for documentation on Quotes.
	})
	.on('response', res => {
		// Returns a response object from the request module. Useful for debugging.
	})
	.on('error', error => {
		// Returns an error if the stream failed to start.
	});
```
For documentation on Quotes, visit the [Global Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/GLOBALS.md#quote)

#### Alpha Vantage

Providing free access to real time and historical market data along with advanced technical analysis, Alpha Vantage has proven to be very helpful when it comes to analyzing stock activity. The only caveat is that, during market hours, their servers can occasionally take a while to respond. But aside from that, you won't find a more well equipped API for free.

To use Algotrader's built-in Alpha Vantage library, you'll first need to grab a free API key [here.](https://www.alphavantage.co/support/#api-key) After the key is displayed on the page, you can copy it to your program and instantiate a new AlphaVantage object like so:

```js
const AlphaVantage = algotrader.Data.AlphaVantage;
const av = new AlphaVantage("myApiKey");
```
After, you can access any of the information provided in their [documentation](https://www.alphavantage.co/documentation/) easily.

```js
// Get real time intraday price information
av.timeSeriesIntraday("AAPL", "1min").then(array => {
	// Returns an array of Quote objects for every minute since market open
    array.forEach(quote => {
    	console.log( quote.getOpen() );   // 174.78
        console.log( quote.getVolume() ); // 13523
    });
});
// Get relative strength index
av.rsi("AAPL", "daily", 14, "close").then(array => {
	// Returns an array of objects representing the RSI on each day
    array.forEach(rsi => {
    	// { date: 2017-11-17T00:00:00.000Z, RSI: '57.3707' }
    });
});
```
For documentation on all AlphaVantage functions, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#AlphaVantage)

#### Query

Using the Yahoo Finance API, you can easily find stocks based on certain criteria.

Here are a few examples:
```js
const Query = algotrader.Data.Query;

Query.search("Nordstrom").then(array => {
	// Returns an array of matching stocks, options, ETF's, and others.
	// [
	// 	{ symbol: 'JWN',
	// 		name: 'Nordstrom, Inc.',
	// 		exch: 'NYQ',
	// 		type: 'S',
	// 		exchDisp: 'NYSE',
	// 		typeDisp: 'Equity' },
	// 	{ symbol: 'JWN180420C00045000',
	// 		name: 'JWN Apr 2018 call 45.000',
	// 		exch: 'OPR',
	// 		type: 'O',
	// 		exchDisp: 'OPR',
	// 		typeDisp: 'Option' },
	//  ... and more
});

Query.getTopGainers(5).then(array => {
	// Returns an array of objects each containing information on the five best performing stocks.
    // You can also use .getTopLosers(count)
});

Query.getHighestVolume(5).then(array => {
	// Returns an array of objects each containing information on five of today's stocks with the highest volume.
});
```
For documentation on all functions of the Query class, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#query)