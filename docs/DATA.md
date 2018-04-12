## Classes

<dl>
<dt><a href="#OptionsChain">OptionsChain</a></dt>
<dd></dd>
<dt><a href="#Quote">Quote</a></dt>
<dd></dd>
<dt><a href="#Stream">Stream</a></dt>
<dd></dd>
</dl>

<a name="OptionsChain"></a>

## OptionsChain
**Kind**: global class  

* [OptionsChain](#OptionsChain)
    * [new OptionsChain(array)](#new_OptionsChain_new)
    * _instance_
        * [.getExpirationDates()](#OptionsChain+getExpirationDates) ⇒ <code>Array.&lt;Date&gt;</code>
        * [.getStrikePrices(date, side)](#OptionsChain+getStrikePrices) ⇒ <code>Array.&lt;Number&gt;</code> \| <code>Error</code>
        * [.getByExpirationDate(date)](#OptionsChain+getByExpirationDate) ⇒ <code>Object</code>
        * [.getNearestStrikePrice(date, side, priceTarget)](#OptionsChain+getNearestStrikePrice) ⇒ <code>Number</code> \| <code>Error</code>
        * [.getNearestExpirationDate(targetDate)](#OptionsChain+getNearestExpirationDate) ⇒ <code>Date</code>
        * [.getVolume(date, strike, side)](#OptionsChain+getVolume) ⇒ <code>Number</code>
        * [.getOpenInterest(date, strike, side)](#OptionsChain+getOpenInterest) ⇒ <code>Number</code>
        * [.getLastPrice(date, strike, side)](#OptionsChain+getLastPrice) ⇒ <code>Number</code>
        * [.getBid(date, strike, side)](#OptionsChain+getBid) ⇒ <code>Number</code>
        * [.getAsk(date, strike, side)](#OptionsChain+getAsk) ⇒ <code>Number</code>
        * [.getChange(date, strike, side)](#OptionsChain+getChange) ⇒ <code>Number</code>
        * [.getLastTradeDate(date, strike, side)](#OptionsChain+getLastTradeDate) ⇒ <code>Date</code>
        * [.getImpliedVolatility(date, strike, side)](#OptionsChain+getImpliedVolatility) ⇒ <code>Number</code>
        * [.isInTheMoney(date, strike, side)](#OptionsChain+isInTheMoney) ⇒ <code>Boolean</code>
    * _static_
        * [.getFromYahoo(symbol)](#OptionsChain.getFromYahoo) ⇒ [<code>Promise.&lt;OptionsChain&gt;</code>](#OptionsChain)

<a name="new_OptionsChain_new"></a>

### new OptionsChain(array)
Creates a new OptionsChain object.


| Param | Type |
| --- | --- |
| array | <code>Array</code> | 

<a name="OptionsChain+getExpirationDates"></a>

### optionsChain.getExpirationDates() ⇒ <code>Array.&lt;Date&gt;</code>
Returns an array of all expiration dates for the OptionsChain object.

**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  
<a name="OptionsChain+getStrikePrices"></a>

### optionsChain.getStrikePrices(date, side) ⇒ <code>Array.&lt;Number&gt;</code> \| <code>Error</code>
Returns an array of all strike prices for the OptionsChain object.

**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> |  |
| side | <code>String</code> | put, call |

<a name="OptionsChain+getByExpirationDate"></a>

### optionsChain.getByExpirationDate(date) ⇒ <code>Object</code>
Returns an options chain for the given date.

**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="OptionsChain+getNearestStrikePrice"></a>

### optionsChain.getNearestStrikePrice(date, side, priceTarget) ⇒ <code>Number</code> \| <code>Error</code>
Returns the nearest strike price to the given price target.

**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| side | <code>String</code> | Strike price to query. |
| priceTarget | <code>Number</code> |  |

<a name="OptionsChain+getNearestExpirationDate"></a>

### optionsChain.getNearestExpirationDate(targetDate) ⇒ <code>Date</code>
Returns the nearest expiration date to the given date.

**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type |
| --- | --- |
| targetDate | <code>Date</code> | 

<a name="OptionsChain+getVolume"></a>

### optionsChain.getVolume(date, strike, side) ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query. |
| side | <code>String</code> | put, call |

<a name="OptionsChain+getOpenInterest"></a>

### optionsChain.getOpenInterest(date, strike, side) ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query |
| side | <code>String</code> | put, call |

<a name="OptionsChain+getLastPrice"></a>

### optionsChain.getLastPrice(date, strike, side) ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query |
| side | <code>String</code> | put, call |

<a name="OptionsChain+getBid"></a>

### optionsChain.getBid(date, strike, side) ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query |
| side | <code>String</code> | put, call |

<a name="OptionsChain+getAsk"></a>

### optionsChain.getAsk(date, strike, side) ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query |
| side | <code>String</code> | put, call |

<a name="OptionsChain+getChange"></a>

### optionsChain.getChange(date, strike, side) ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query |
| side | <code>String</code> | put, call |

<a name="OptionsChain+getLastTradeDate"></a>

### optionsChain.getLastTradeDate(date, strike, side) ⇒ <code>Date</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query |
| side | <code>String</code> | put, call |

<a name="OptionsChain+getImpliedVolatility"></a>

### optionsChain.getImpliedVolatility(date, strike, side) ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query |
| side | <code>String</code> | put, call |

<a name="OptionsChain+isInTheMoney"></a>

### optionsChain.isInTheMoney(date, strike, side) ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Expiration date to query. |
| strike | <code>Number</code> | Strike price to query |
| side | <code>String</code> | put, call |

<a name="OptionsChain.getFromYahoo"></a>

### OptionsChain.getFromYahoo(symbol) ⇒ [<code>Promise.&lt;OptionsChain&gt;</code>](#OptionsChain)
Returns a new OptionsChain object with data from Yahoo Finance.

**Kind**: static method of [<code>OptionsChain</code>](#OptionsChain)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Quote"></a>

## Quote
**Kind**: global class  

* [Quote](#Quote)
    * [new Quote(array)](#new_Quote_new)
    * [.getFromYahoo(range, interval, extended)](#Quote.getFromYahoo) ⇒ [<code>Promise.&lt;Quote&gt;</code>](#Quote)

<a name="new_Quote_new"></a>

### new Quote(array)
Creates a new Quote object.


| Param | Type |
| --- | --- |
| array | <code>Array</code> | 

<a name="Quote.getFromYahoo"></a>

### Quote.getFromYahoo(range, interval, extended) ⇒ [<code>Promise.&lt;Quote&gt;</code>](#Quote)
Returns a new Quote object with data from Yahoo Finance.

**Kind**: static method of [<code>Quote</code>](#Quote)  

| Param | Type | Description |
| --- | --- | --- |
| range | <code>String</code> | 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max |
| interval | <code>String</code> | 1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo |
| extended | <code>Boolean</code> | Whether to include extended hours or not. |

<a name="Stream"></a>

## Stream
**Kind**: global class  

* [Stream](#Stream)
    * [new Stream(symbols)](#new_Stream_new)
    * [.start()](#Stream+start)
    * [.stop()](#Stream+stop)

<a name="new_Stream_new"></a>

### new Stream(symbols)
Creates a new Stream class.


| Param | Type |
| --- | --- |
| symbols | <code>Array</code> | 

<a name="Stream+start"></a>

### stream.start()
Start the streaming class.

The event will emit three events: error (Error object), response (JSON from request module), and data (JSON object).
Access via .on('data', function), etc.

**Kind**: instance method of [<code>Stream</code>](#Stream)  
<a name="Stream+stop"></a>

### stream.stop()
Stop the streaming class.

**Kind**: instance method of [<code>Stream</code>](#Stream)  
