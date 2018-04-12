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
	- Realtime quote data streaming for cryptocurrency, forex, equities
		- Get data on bids, asks, last price, and more from the Yahoo Finance API
	- Up-to-date options data
	- Easily find stocks for various queries
		- Retrieve the day's top gainers
		- Retrieve the day's top losers
		- Get stocks by highest (abnormal) volume
		- Get options contracts by highest open interest
		- And more
	- Get up to the minute news on specified stocks
		- In progress: stream news in realtime
	- Get technical indicators from AlphaVantage (in progress)
		- SMA, EMA, RSI, etc.
	- Get fundamentals and balance sheet data (in progress)
		- Assets, debt, liabilities, revenue, earnings, etc.
- **Algorithm library** (in progress)
	- Create algorithms that will automatically place trades based on your criteria
	- Backtest algorithms on past market data

---

### Table of Contents

- [Getting Started](#getting-started)
- Broker Library
	- [Robinhood](#robinhood)
- Data Library
	- [Quote](#quote)
	- [OptionsChain](#optionsChain)
	- [Query](#query)
	- [Stream](#stream)
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

const myAccount = new User("username", "password");
myAccount.authenticate()
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
myAccount.getPortfolio()
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
Placing an order will require the [```User```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#User), [```Instrument```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Instrument), [```Quote```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Quote), and [```Order```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Order) classes.

All orders first require that you grab a new [```Instrument```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Instrument) object which represents, in most cases, a stock or ETF. You can also grab the object from your [```Portfolio```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Portfolio). Then, Robinhood requires that you also submit the stock's market price in the order, so you should retrieve a [```Quote```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Quote) from them on the [```Instrument```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Instrument) object. You'll then pass these objects as parameters to a new [```Order```](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Order).

In addition to this, you'll pass all information necessary to place the order. This includes:

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
    // You'll probably have a quote object already if you're not trading blindly. Most people like to know the price of a stock before they buy it.
    const myOrder = new Order(null, myAccount, twtrInstrument, await twtrInstrument.getQuote(), "market", "GFD", "immediate", null, "10", "buy", true, false);
    myOrder.submit().then(res => {
		// Order was successful
	}).catch(error => {
		// Either the request failed, or Robinhood responded with an error.
		// (Ex: you don't have internet access or your balance was insufficient)
    })
});
```
For documentation on all order functions, visit the [Robinhood Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Order)