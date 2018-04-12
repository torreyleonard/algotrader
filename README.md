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
	- [Robinhood](rRobinhood)
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
First, you'll need to create a new ```User``` instance and authenticate them.
```js
const robinhood = require('algotrader').Robinhood;
const User = robinhood.User;

const myAccount = new User("username", "password");
myAccount.authenticate()
	.then(() => {
		// User was authenticated
	})
	.catch(error => {
		// Either the request failed, or Robinhood responded with an error. (Ex: you don't have internet access or your user credentials were incorrect)
	})
```
Personally, I either store user data as an array in a .json file, then require it into the class, (insecure) or ask for the user's credentials in the console. You should handle this sensitive data in a way that you're comfortable with.

#### Get a user's portfolio
There are a good amount of query functions that you can run on the user's portfolio. Using your ```User``` instance, you can grab the portfolio using ``` User.getPortfolio()``` which returns a new ```Portfolio``` object.
```js
myAccount.getPortfolio()
	.then(myPortfolio => {
		// You can find information on specific symbols
		let myTeslaShares = myPortfolio.getQuantity("TSLA"); // Returns the quantity of shares you own in the given symbol: 10
		let bestDayEver = myPortfolio.getPurchaseDate("SHLD"); // Returns the date (Date object) you purchased the given symbol: 2007-04-17
		// You can find information on the entire portfolio
		let mySymbols = myPortfolio.getSymbols(); // Returns an array of all symbols in the user's portfolio: ['FB', 'AMZN', 'NFLX', 'GOOG']
		let myMoneyMakers = myPortfolio.getQuantityGreaterThan(50); // Returns an array of all positions greater than the given amount: [Object]
		// Along with much more. See the link below to visit the Robinhood portfolio documentation.
	})
	.catch(error => {
		// Either the request failed, or Robinhood responded with an error. (Ex: you don't have interet access or your user credentials were incorrect)
	})
```
For documentation on all portfolio functions, visit the [Robinhood Library Docs.](https://github.com/Ladinn/algotrader/blob/master/docs/ROBINHOOD.md#Portfolio)

In progress...