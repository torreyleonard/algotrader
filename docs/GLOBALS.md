## Classes

<dl>
<dt><a href="#OptionsChain">OptionsChain</a></dt>
<dd></dd>
<dt><a href="#Quote">Quote</a></dt>
<dd></dd>
</dl>

<a name="OptionsChain"></a>

## OptionsChain
**Kind**: global class  

* [OptionsChain](#OptionsChain)
    * [new OptionsChain(array)](#new_OptionsChain_new)
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

<a name="Quote"></a>

## Quote
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| date | <code>Date</code> |  |
| source | <code>String</code> |  |
| price | <code>Object</code> |  |
| price.last | <code>Number</code> |  |
| price.open | <code>Number</code> |  |
| price.high | <code>Number</code> |  |
| price.low | <code>Number</code> |  |
| price.close | <code>Number</code> |  |
| price.volume | <code>Number</code> |  |
| price.adjustedClose | <code>Number</code> |  |
| dom | <code>Object</code> |  |
| dom.bid.price | <code>Number</code> |  |
| dom.bid.size | <code>Number</code> |  |
| dom.ask.price | <code>Number</code> |  |
| dom.ask.size | <code>Number</code> |  |
| meta | <code>Object</code> | Price changes, dividends, splits, market cap, etc. |
| original | <code>String</code> | Original JSON string |


* [Quote](#Quote)
    * [new Quote(object)](#new_Quote_new)
    * _instance_
        * [.getSymbol()](#Quote+getSymbol) ⇒ <code>String</code>
        * [.getDate()](#Quote+getDate) ⇒ <code>Date</code>
        * [.getSource()](#Quote+getSource) ⇒ <code>String</code>
        * [.getLast()](#Quote+getLast) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getOpen()](#Quote+getOpen) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getHigh()](#Quote+getHigh) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getLow()](#Quote+getLow) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getClose()](#Quote+getClose) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getVolume()](#Quote+getVolume) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getAdjustedClose()](#Quote+getAdjustedClose) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getBidPrice()](#Quote+getBidPrice) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getBidSize()](#Quote+getBidSize) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getAskPrice()](#Quote+getAskPrice) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getAskSize()](#Quote+getAskSize) ⇒ <code>Number</code> \| <code>Null</code>
        * [.getMeta()](#Quote+getMeta) ⇒ <code>Object</code> \| <code>Null</code>
        * [.getOriginal()](#Quote+getOriginal) ⇒ <code>String</code>
    * _static_
        * [.getVWAP(quoteArray)](#Quote.getVWAP) ⇒ <code>Number</code>
        * [.priceChannel(quoteArray, period)](#Quote.priceChannel) ⇒ <code>Object</code>

<a name="new_Quote_new"></a>

### new Quote(object)
Creates a new Quote instance.


| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="Quote+getSymbol"></a>

### quote.getSymbol() ⇒ <code>String</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getDate"></a>

### quote.getDate() ⇒ <code>Date</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getSource"></a>

### quote.getSource() ⇒ <code>String</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getLast"></a>

### quote.getLast() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getOpen"></a>

### quote.getOpen() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getHigh"></a>

### quote.getHigh() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getLow"></a>

### quote.getLow() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getClose"></a>

### quote.getClose() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getVolume"></a>

### quote.getVolume() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getAdjustedClose"></a>

### quote.getAdjustedClose() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getBidPrice"></a>

### quote.getBidPrice() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getBidSize"></a>

### quote.getBidSize() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getAskPrice"></a>

### quote.getAskPrice() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getAskSize"></a>

### quote.getAskSize() ⇒ <code>Number</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getMeta"></a>

### quote.getMeta() ⇒ <code>Object</code> \| <code>Null</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote+getOriginal"></a>

### quote.getOriginal() ⇒ <code>String</code>
**Kind**: instance method of [<code>Quote</code>](#Quote)  
<a name="Quote.getVWAP"></a>

### Quote.getVWAP(quoteArray) ⇒ <code>Number</code>
Returns the volume weighted average price (VWAP) for the given quote array.
https://www.investopedia.com/terms/v/vwap.asp

**Kind**: static method of [<code>Quote</code>](#Quote)  

| Param | Type |
| --- | --- |
| quoteArray | <code>Array</code> | 

<a name="Quote.priceChannel"></a>

### Quote.priceChannel(quoteArray, period) ⇒ <code>Object</code>
Retrieves the highest high and lowest low for the provided period of time.

**Kind**: static method of [<code>Quote</code>](#Quote)  

| Param | Type |
| --- | --- |
| quoteArray | <code>Array</code> | 
| period | <code>int</code> | 

