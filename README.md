![algotrader](https://raw.githubusercontent.com/Ladinn/algotrader/master/docs/img/algotrader.png)
#### *Simple algorithmic stock and option trading for Node.js.*

[![npm package](https://nodei.co/npm/algotrader.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/algotrader/)

[![NPM Version](https://img.shields.io/npm/v/algotrader.svg?style=flat-square)](https://www.npmjs.com/package/algotrader)
[![NPM Downloads](https://img.shields.io/npm/dt/algotrader.svg?style=flat-square)](https://www.npmjs.com/package/algotrader)
[![GitHub Commit](https://img.shields.io/github/last-commit/Ladinn/algotrader.svg?style=flat-square)](https://github.com/Ladinn/algotrader)
[![GitHub Issues](https://img.shields.io/github/issues/Ladinn/algotrader.svg?style=flat-square)](https://github.com/Ladinn/algotrader/issues)
[![GitHub Stars](https://img.shields.io/github/stars/Ladinn/algotrader.svg?style=flat-square)](https://github.com/Ladinn/algotrader)
[![Discord](https://img.shields.io/discord/551040132476567563.svg?style=flat-square&logo=discord)](https://discord.gg/RAtwEXc)

---

### Features
- **Extensive broker library**
	- Easily place orders
	- Retrieve past orders
	- Query a users portfolio
	- Supported brokers:
		- Robinhood
		- TDAmeritrade (in progress)
		- Oanda (in progress)
		- If you'd like to have another broker supported, submit an issue or a pull request
- **Data library**
	- Real time quote data streaming for cryptocurrency, forex, equities
		- Get data on bids, asks, last price, and more from the Yahoo Finance API
		- Stream news headlines along with quotes
	- Up-to-date options data
	- Easily find stocks for various queries
		- Retrieve the day's top gainers
		- Retrieve the day's top losers
		- Get stocks by highest (abnormal) volume
		- Get options contracts by highest open interest
		- And more
	- Get up to the minute breaking headlines
	- Get technical indicators from AlphaVantage
		- SMA, EMA, RSI, etc.
	- Get fundamentals and balance sheet data (in progress)
		- Assets, debt, liabilities, revenue, earnings, etc.
- **Algorithm library** (in progress)
	- Create algorithms that will automatically place trades based on your criteria
	- Backtest algorithms on past market data
	- Paper (simulated) trade your algorithm to see how it performs in real time
- **Support for many third-party APIs**
	- [Robinhood](http://robinhood.com/)
	- [Alpha Vantage](https://www.alphavantage.co/)
	- [Yahoo! Finance](https://finance.yahoo.com)
	- [News API](https://newsapi.org/)
	- [IEX](https://iextrading.com/)
	- [Nasdaq](https://www.nasdaq.com/)

---

### Table of Contents

- [Getting Started](#getting-started)
- Broker Library
	- [Robinhood](#robinhood)
		- [Getting started](#robinhood)
		- [Multi-factor authentication](#mfa)
    	- [Saving & loading a user](#saving--loading-a-user)
    	- [Get a user's portfolio](#get-a-users-portfolio)
    	- [Placing an order](#placing-an-order)
    	- [Options](#options)
    	- [Option chains](#option-chains)
- Algorithm Library
	- [Scheduler](#scheduler)
- Data Library
	- [Real time streaming](#real-time-streaming)
	- [Alpha Vantage](#alpha-vantage)
	- [IEX](#iex)
	- [Nasdaq](#nasdaq)
	- [Query](#query)
	- [News](#news)
- [Further Notes](#notes)
	- [Dealing with errors](#dealing-with-errors)
	- [Error reporting](https://github.com/Ladinn/algotrader/issues)
	

---

### Support

* [Issues](https://github.com/Ladinn/algotrader/issues)
* [Pull Requests](https://github.com/Ladinn/algotrader/pulls)
* [Releases](https://github.com/Ladinn/algotrader/releases)
* [Further Documentation](https://github.com/Ladinn/algotrader/tree/master/docs)

### <img align="center" src="https://i.imgur.com/nPCnzon.png">

* Join our Discord: [https://discord.gg/RAtwEXc](https://discord.gg/RAtwEXc)
* Get answers to questions or help us deal with open issues.
* Tell us about how you're using Algotrader!

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

**Note:** providing a password in the User constructor is optional. You can also pass it to [```User.authenticate()```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User) as the first parameter like so:

```js
const myUser = new User("username");
myUser.authenticate("password")
	.then(() => {
    	// User was authenticated
    });
```
If it is not provided at all, you will be prompted via CLI. 

##### MFA

Algotrader now supports multi-factor authentication. So, if you have this enabled on your account (which is a good idea by the way), you'll be prompted to enter the six-digit code after login. If you run a trading script with this library automatically and have MFA enabled, it may be worth your while to utilize a telecom API (possible through Twilio?) to have the code programmatically retrieved (see below).

The MFA prompt will appear like so:

![Algotrader MFA Prompt](https://i.gyazo.com/11420983d69bf02a59026947513408ac.png)

To enter the code programmatically, you can pass a function to [```User.authenticate()```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User) that returns a promise containing the MFA code in a six-character string. For example:

```js
function getMFA() {
	return new Promise((resolve, reject) => {
    	// Get the code here
        const mfa = "123456"
        resolve(mfa);
    })
}
// Note: the first parameter here is 'password' and is only required if you are re-authenticating
// an expired user or if you did not provide a password in the User constructor.
myUser.authenticate(null, getMFA)
	.then(() => {
		// User was authenticated
	})
```

##### Saving & loading a user

In order to reduce time logging in, you can save an authenticated user to disk and load it into memory for subsequent requests. If you're using multi-factor authentication, I definitely recommend this- it really saves a lot of time and energy.

After you've logged in (see above), you can run the following:

```js
const authenticatedUser;
authenticatedUser.save()
	.then(() => {
    	// The user data was saved to:
        // project/node_modules/algotrader/objects/broker/robinhood/User.json
    });
```

Note that your password will never be saved to disk. Keep this in mind when having to re-authenticate.

Once saved, you can easily login like so:

```js
const robinhood = require('algotrader').Robinhood;
const User = robinhood.User;

User.load()
	.then(myUser => {
		myUser.isAuthenticated(); // Boolean - see below
	})
	.catch(error => {
		// Make sure to always catch possible errors. You'll need to re-authenticate here.
		// - Possible errors: user session has expired, a saved user does not exist.
		if (error) {
			// Re-auth here and save if desired.
		}
	});
```

However, authentication tokens issued by Robinhood expire after 24 hours. Version 1.4.5 takes this into account and [```User.isAuthenticated()```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User) will return ```false``` if the token has expired. Make sure to check for this and re-authenticate if necessary. When re-authenticating, you will need to provide a password either through CLI or when calling [```User.authenticate()```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User) as the first parameter.

#### Get a user's portfolio
There are a good amount of query functions that you can run on the user's portfolio. Using your [```User```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User) instance, you can grab the portfolio using [```User.getPortfolio```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User) which returns a new [```Portfolio```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Portfolio) object.
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

**Note:** the portfolio object does not return a user's open option positions. See the options section below for details.

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
	// As of ~01/15/19, Robinhood requires an authenticated user to fetch a quote.
    // Working with Algotrader version > 1.4.3, thanks @Gillinghammer!
	let twtrQuote = await twtrInstrument.getQuote(user);
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
```
For documentation on all order functions, visit the [Robinhood Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Order)

#### Options
Receiving open option positions and placing option orders varies slightly from stocks. These actions will require the [```OptionInstrument```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#OptionInstrument) and [```OptionOrder```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#OptionOrder) classes.

Here is an example for how to query an option chain and place an order for an individual option. See [```OptionOrder```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#OptionOrder) documentation for details on new order parameters.
```js
const Instrument = algotrader.Robinhood.Instrument;
const OptionInstrument = algotrader.Robinhood.OptionInstrument;
const OptionOrder = algotrader.Robinhood.OptionOrder;

async function gains(user) {

  // First, we'll get the instrument that corresponds to the symbol TLRY.
  const tlry = await Instrument.getBySymbol('TLRY');
  
  // Next, we'll fetch an option chain containing puts for the upcoming expiration date.
  // This will return an array of OptionInstruments. See the example in the next section below.
  const chain = await OptionInstrument.getChain(user, tlry, expirations[0], 'put');
  
  // Now that we have the option chain, we'll need to find which OptionInstrument to trade
  // based on its strike price and expiration date. See the example below for how to sort them.
  // For now, we'll just take the first option contract in the array.
  const optionToBuy = chain[0];
  
  // Finally, we can create and place an order like so:
  let order = new OptionOrder(user, {
  	side: 'buy',
    type: 'limit', // Note: Robinhood does not allow market buy orders
    price: '',
    timeInForce: 'gtc',
    quantity: 1,
    option: optionToBuy
  });
  
  order.submit().then(executedOrder => {
  	// Success!
    console.log(executedOrder);
  }).catch(error => console.error(error));
  
}

```
##### Option chains
Represented as an array of OptionInstruments, option chains provide you with all of the tradable contracts for a specific option instrument and expiration date. They are fetched using [```OptionInstrument.getChain```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#OptionInstrument) and used for an [```OptionOrder.```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#OptionOrder)

Below is an example of a single element from within the array:
```js
[ OptionInstrument {
    url: 'https://api.robinhood.com',
    tradability: 'tradable',
    strikePrice: 121,
    state: 'active',
    type: 'put',
    symbol: 'TLRY',
    minTicks: { cutoff_price: '3.00', below_tick: '0.01', above_tick: '0.05' },
    instrumentURL: 'https://api.robinhood.com/options/instruments/28c3224d-3aa3-428c-aa78-7e0f5a4d01a0/',
    ids: 
     { chain: 'c49063f0-557b-44b7-aeef-11fbc6a51243',
       option: '28c3224d-3aa3-428c-aa78-7e0f5a4d01a0' },
    dates: 
     { expiration: 2019-02-01T00:00:00.000Z,
       created: 2019-01-18T03:08:31.325Z,
       updated: 2019-01-18T03:08:31.325Z } }, ...
```

Here is an example of how you would sort an option chain by strike price and expiration date. For this example, we'll get a quote, the options chain, and option expiration dates and use that data buy the nearest in-the-money call.

```js
const moment = require('moment');

const qqq = await Instrument.getBySymbol('QQQ');
const quote = await qqq.getQuote(user);
const chain = await OptionInstrument.getChain(user, qqq, 'call');
const expirations = await OptionInstrument.getExpirations(user, qqq);
// Returns an array of expiration dates [ 2019-02-01T00:00:00.000Z, 2019-02-08T00:00:00.000Z, ...

const nextExpiration = moment(expirations[0]);

let optionsExpiringNext = [];

chain.forEach(option => {
	let thisExpiration = moment(option.getExpiration());
    if (thisExpiration.isSame(nextExpiration)) {
    	optionsExpiringNext.push(option);
    }
});



```

---

### Algorithm Library

For scheduling tasks, running backtests, and paper-trading, the algorithm library should be more than useful.

#### Scheduler

Using the [```Scheduler```](https://github.com/Ladinn/algotrader/blob/master/docs/ALGORITHM.md#scheduler) class, you'll be able to define exactly when you want a function to run using the following methods:

- ```Scheduler.onMarketOpen(offset, f)```
	- Runs every morning when the NYSE opens. (Typically 9:30 AM EST)
	- Offset is in milliseconds and can be positive (after) or negative (before).
- ```Scheduler.onMarketClose(offset, f)```
	- Runs every afternoon when the NYSE closes. (Typically 4:00 PM EST)
	- Offset is in milliseconds and can be positive (after) or negative (before).
- ```Scheduler.every(minutes, extended, f)```
	- Runs every ```x``` minutes during market hours or during typical extended trading hours. (9 AM EST - 6 PM EST)

Here's an easy example that runs a function 5 minutes before the market opens and another one every 30 minutes during regular trading hours:

```js
const Scheduler = algotrader.Algorithm.Scheduler;

Scheduler.onMarketOpen(-5 * 60000, () => {
	// Function to run five minutes before the market opens
});

Scheduler.every(30, false, () => {
	// Function to run every 1/2 hour
});
```
For documentation on all Scheduler functions, visit the [```Algorithm Library Docs.```](https://github.com/Ladinn/algotrader/blob/master/docs/ALGORITHM.md#scheduler)

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
		// Returns a single Quote object. See the link below for documentation on Quotes.
	})
	.on('response', res => {
		// Returns a response object from the request module. Useful for debugging.
	})
	.on('error', error => {
		// Returns an error if the stream failed to start.
	});
```
For documentation on Quotes, visit the [Global Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/GLOBALS.md#quote)

Not only can you stream quotes, but you can include news articles using the built-in [News Library.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#news) This is useful for reacting to breaking headlines with pre-determined trades (for example, earnings reports or FOMC results). To do this, just add a second parameter (an object) to ```new Stream()``` as shown below.

```js
const myStreamWithNews = new Stream(["JPM", "COST", "FDX"], {
	news: true, // Tells the streamer to also include news
    allHeadlines: true, // If true, all U.S. headlines will be sent in the stream. If false, only news pertaining to the given symbols will be outputted.
    newsApiKey: "newsApiKeyGoesHere" // Your API key from NewsAPI.org. See the link below for documentation on News.
});
myStreamWithNews.start();

myStreamWithNews
	.on('quote', quote => {
		// Returns a single Quote object. See the link below for documentation on Quotes.
	})
    .on('news', news => {
    	// Returns a single News object. See the link below for documentation on News.
    })
	.on('response', res => {
		// Returns a response object from the request module. Useful for debugging.
	})
	.on('error', error => {
		// Returns an error if the stream failed to start.
	});
```
For documentation on News, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#news)

You can also instruct the stream class to fire events from IEX. You'll first want to find the streaming endpoint that contains the data you want to query. For the most part, you'll want to use ```tops,``` ```deep,``` and ```last.``` Find them all [here.](https://iextrading.com/developer/docs/#iex-market-data)

```js
const streamWithIEX = new Stream(["PG", "DIN", "ULTA"], {
    iex: true,
    iexType: "tops"
});
streamWithIEX.on('iex', iex => {
    // Returns an object described here: https://iextrading.com/developer/docs/#iex-market-data
});
```

For documentation on IEX, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#iex)

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
For documentation on all Alpha Vantage functions, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#AlphaVantage)

#### IEX

IEX is a stock exchange founded in 2012 with the goal of creating "fairer markets." True to this goal, they've created a public API for use by everyone, not just institutions that can afford a massive monthly  payment for data. Thanks to many factors, such as trading arbitrage, their quotes are the same (if not off by a fraction of a basis point) as the NYSE's and Nasdaq's nearly 100% of the time, even with their low volume comparatively. With that being said, below are a few examples of ways you can access their quote data and corporate financial information. For a full list of IEX queries, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#iex)

```js
const IEX = algotrader.Data.IEX;

// Returns a quote object
IEX.getQuote("CSX").then(quote => {
	// Quote {
	// 	symbol: 'CSX',
	// 		date: 2018-05-04T20:00:00.251Z,
	// 		source: 'IEX',
	// 		price:
	// 	{ last: 59.97,
	// 		open: 58.69,
	// 		high: 60.41,
	// 		low: 58.575,
	// 		close: 59.97,
	// 		volume: 4186069 },
	// 	dom: { bids: [], asks: [] }, - This was written while the market was closed. While the market is open, DOM elements are supported in the Quote object.
	// 	meta: undefined,
	// 		original: undefined }
});

// Returns an array of fiscal reports dating back 5 years
IEX.getFinancials("AVGO").then(financials => {
	// [ { reportDate: '2018-01-31',
	// 	grossProfit: 2643000000,
	// 	costOfRevenue: 2684000000,
	// 	operatingRevenue: 5327000000,
	// 	totalRevenue: 5327000000,
	// 	operatingIncome: 1088000000,
	// 	netIncome: 6230000000,
	// 	researchAndDevelopment: 925000000,
	// 	operatingExpense: 1555000000,
	// 	currentAssets: 11220000000,
	// 	totalAssets: 54544000000,
	// 	totalLiabilities: 28643000000,
	// 	currentCash: 7076000000,
	// 	currentDebt: 117000000,
	// 	totalCash: 7076000000,
	// 	totalDebt: 17592000000,
	// 	shareholderEquity: 25901000000,
	// 	cashChange: -4128000000,
	// 	cashFlow: 1685000000,
	// 	operatingGainsLosses: null },
});

// Returns company name, EPS, divided, short interest, 52-week high/low, percent change, EBITDA, and more.
IEX.getStats("HD").then(stats => {
	// For full output see https://iextrading.com/developer/docs/#key-stats
});

```

You can even grab a company's logo with:

```js
IEX.getLogo("MMM").then(logoURL => {
	// https://storage.googleapis.com/iex/api/logos/MMM.png
});
```
Output:

![3M](https://storage.googleapis.com/iex/api/logos/MMM.png)

For documentation on IEX queries, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#iex)

#### Nasdaq

By market cap, the Nasdaq is the second largest global stock exchange behind only the NYSE. They offer a paid subscription for real time streaming, but Algotrader makes use of their public data repository via FTP. Below is an example of how to retrieve an array of all securities listed on their exchange. For a full list of Nasdaq queries, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#nasdaq)

```js
const Nasdaq = algotrader.Data.Nasdaq;

Nasdaq.getListings().then(array => {
	// [
	// 	{
	// 		Symbol: 'AABA',
	// 		'Security Name': 'Altaba Inc. - Common Stock',
	// 		'Market Category': 'Q',
	// 		'Test Issue': 'N',
	// 		'Financial Status': 'N',
	// 		'Round Lot Size': '100',
	// 		ETF: 'N',
	// 		NextShares: 'N'
	// 	},
	// 	{
	// 		Symbol: 'AAL',
	// 		'Security Name': 'American Airlines Group, Inc. - Common Stock',
	// 		'Market Category': 'Q',
	// 		'Test Issue': 'N',
	// 		'Financial Status': 'N',
	// 		'Round Lot Size': '100',
	// 		ETF: 'N',
	// 		NextShares: 'N'
	// 	},
	// ... and thousands more
});
```

For documentation on Nasdaq queries, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#nasdaq)

#### Query

Using the Yahoo Finance and Robinhood APIs, you can easily find stocks based on certain criteria.

Here are a few examples:
```js
const Query = algotrader.Data.Query;

Query.getEarnings(1).then(array => {
	// Returns an array of companies that are reporting their earnings within the next '1' day.
	// [
	//     { 
	//      symbol: 'NFLX',
	// 	    instrument: 'https://api.robinhood.com/instruments/81733743-965a-4d93-b87a-6973cb9efd34/',
	//      year: 2018,
	//      quarter: 1,
	//      eps: { estimate: '0.6400', actual: null },
	//      report: { date: '2018-04-16', timing: 'pm', verified: true },
	//      call:
	//          { datetime: '2018-04-16T22:00:00Z',
	//            broadcast_url: 'http://mmm.wallstreethorizon.com/u.asp?u=152320',
	//            replay_url: null }
	//     },
	// ... and more
});

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

#### News

Thanks to both [News API](https://newsapi.org/) and Yahoo Finance, you can get breaking news headlines and various articles on either specific companies or the market or world as a whole.

First you'll want to create a reference to the News class: ```const News = algotrader.Data.News;```

You can then use either Yahoo Finance or News API to retrieve news articles, but it's easier to find exactly what you're looking for with the latter.

For Yahoo Finance, simply do the following:
```js
News.getFromYahoo("AAPL").then(array => {
	// Returns an array of news articles for the given symbol
	// [
	// 	    News {
	// 		    title: 'Amazon and Walmart Battle for Control of Flipkart',
	// 		    description: 'The world&apos;s largest retailer and its online counterpart compete on many fronts, but the fight for India&apos;s largest online retailer may be one of the most important.',
	// 		    date: 2018-04-15T15:45:00.000Z,
	// 		    source: undefined,
	// 		    author: undefined,
	// 		    url: 'https://finance.yahoo.com/news/amazon-walmart-battle-control-flipkart-154500760.html?.tsrc=rss' },
	// 	    News {
	// 		    title: 'President Trump is considering rejoining the Trans Pacific Partnership trade deal',
	// 		    	description: 'President Trump is opening the door to rejoining the Trans Pacific Partnership trade deal. Yahoo Finance’s Jen Rogers and Rick Newman look at the implications.',
	// 		    	date: 2018-04-13T14:40:56.000Z,
	// 		    	source: undefined,
	// 		    	author: undefined,
	// 		    	url: 'https://finance.yahoo.com/video/president-trump-considering-rejoining-trans-144056381.html?.tsrc=rss' },
    // ... and more
});
```
You'll notice that Yahoo Finance does not provide the author or the source and only links back to their website.

With News API, you'll get many more options on what articles to return. However, you'll need a free API key in order to use their service. [Register for one here.](https://newsapi.org/register) You can then get either breaking/recent headlines or search for all articles matching your query.

Each News API query must contain an object with at least one query option. Possible parameters for the two functions are:

- **```getHeadlines(apiKey, object)```**
  - ```q``` - Keywords or phrases to search for.
  - ```category``` - Possible options: business, entertainment, general, health, science, sports, technology (Cannot be mixed with sources parameter)
  - ```country```- The 2-letter ISO 3166-1 code of the country you want to get headlines for. (Cannot be mixed with sources parameter)
  - ```sources``` - A comma-separated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. (Cannot be mixed with country parameter)
  - ```pageSize``` - The number of results to return per page. 20 is the default, 100 is the maximum.
  - ```page``` - Use this to page through the results.
- **```getAll(apiKey, object)```**
  - ```q``` - Keywords or phrases to search for.
  - ```sources``` - A comma-separated string of identifiers (maximum 20) for the news sources or blogs you want headlines from.
  - ```domains``` - A comma-separated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to restrict the search to.
  - ```from``` - A date object for the oldest allowed article.
  - ```to``` - A date object for the newest allowed article.
  - ```language``` - Possible options: ar, de, en, es, fr, he, it, nl, no, pt, ru, se, ud, zh
  - ```sortBy``` - Possible options: relevancy, popularity, publishedAt (newest)
  - ```pageSize``` - The number of results to return per page. 20 is the default, 100 is the maximum.
  - ```page``` - Use this to page through the results.

Here is an example query for U.S. articles relating to using ```getHeadlines(apiKey, object)```:

```js
News.getHeadlines("myApiKey", {
    country: "us",
    category: "business"
}).then(array => {
	// Returns an array of News objects related to U.S. business.
	// [
	//      News {
	//              title: 'Two black men were arrested waiting at a Starbucks. Now the company, police are on the defensive.',
	//              description: 'The backlash is a dramatic turn from efforts to craft the company as a progressive 	corporate leader that values “diversity and inclusion.”',
	//              date: 2018-04-15T15:22:22.000Z,
	//              source: 'The Washington Post',
	//              author: null,
	//              url: 'https://www.washingtonpost.com/news/business/wp/2018/04/15/two-black-men-were-arrested-waiting-at-a-starbucks-now-the-company-police-are-on-the-defensive/' },
	//      News {
	//              title: 'Zillow surprises investors by buying up homes',
	//              description: 'Real estate platform Zillow changed up its business model this week, announcing that it plans to purchase and sell homes in Las Vegas and Phoenix. Zillow will be working with Berkshire Hathaway and Coldwell Banker to make offers on homes before it finds a buy…',
	//              date: 2018-04-15T00:27:56.000Z,
	//              source: 'TechCrunch',
	//              author: 'Katie Roof',
	//              url: 'https://techcrunch.com/2018/04/14/zillow-surprises-investors-by-buying-up-homes/' }
	// ... and more
});
```
The [News Class](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#news) provides a few functions that you can run to easily retrieve information you need, such as ```news.getTitle()```, ```news.getDate()```, and ```news.getDescription().``` You can also download the full article from the source:
```js
news.getArticle().then(html => {
	// This will return raw HTML from the source. You'll have to parse it yourself if you want to read the entire article, but typically the description - news.getDescription() - is sufficient.
});
```
For documentation on all News functions, visit the [Data Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/DATA.md#News)

---
### Notes

#### Dealing with errors

You should ensure that all promises are provided a ```catch``` function in case they are rejected. In order to help with debugging, the ```Error.toString()``` method is modified in Algotrader's library. If you don't choose to use this you can continue to simply print the error.

For example:
```js
myOrder.submit().then(res => {
	// Order was successful
}).catch(error => { console.error(error.toString()) });
```
This would print something similar to the image below, providing the response code and error message(s) from Robinhood. This is a larger error, so keep in mind that most of these would be on one line.

![Algotrader Error toString](https://i.gyazo.com/b30d408b59ae6304894a10c2880862c3.png)

However, if you don't like this and want to keep your errors uniform, you can simply use ```console.error(error)``` without ```toString().```

![Algotrader Error](https://i.gyazo.com/40c9f81be2c815a520ee9ec9f128f197.png)

As you can probably see from the images, it's much appreciated if you report unexpected errors as a new Issue on GitHub. Not only can you get help resolving the error if it's an isolated incident, but it also helps fix bugs in future updates.

You can report errors [here.](https://github.com/Ladinn/algotrader/issues)