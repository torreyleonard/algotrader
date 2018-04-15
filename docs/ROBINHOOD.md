## Classes

<dl>
<dt><a href="#Fundamentals">Fundamentals</a></dt>
<dd></dd>
<dt><a href="#Instrument">Instrument</a></dt>
<dd></dd>
<dt><a href="#Market">Market</a></dt>
<dd></dd>
<dt><a href="#OptionOrder">OptionOrder</a></dt>
<dd></dd>
<dt><a href="#Order">Order</a></dt>
<dd></dd>
<dt><a href="#Portfolio">Portfolio</a></dt>
<dd></dd>
<dt><a href="#User">User</a></dt>
<dd></dd>
</dl>

<a name="Fundamentals"></a>

## Fundamentals
**Kind**: global class  

* [Fundamentals](#Fundamentals)
    * [new Fundamentals(object)](#new_Fundamentals_new)
    * _instance_
        * [.getOpen()](#Fundamentals+getOpen) ⇒ <code>Number</code>
        * [.getHigh()](#Fundamentals+getHigh) ⇒ <code>Number</code>
        * [.getLow()](#Fundamentals+getLow) ⇒ <code>Number</code>
        * [.getVolume()](#Fundamentals+getVolume) ⇒ <code>Number</code>
        * [.getAverageVolume()](#Fundamentals+getAverageVolume) ⇒ <code>Number</code>
        * [.get52WeekHigh()](#Fundamentals+get52WeekHigh) ⇒ <code>Number</code>
        * [.get52WeekLow()](#Fundamentals+get52WeekLow) ⇒ <code>Number</code>
        * [.getMarketCap()](#Fundamentals+getMarketCap) ⇒ <code>Number</code>
        * [.getDividendYield()](#Fundamentals+getDividendYield) ⇒ <code>Number</code>
        * [.getPERatio()](#Fundamentals+getPERatio) ⇒ <code>Number</code>
        * [.getDescription()](#Fundamentals+getDescription) ⇒ <code>String</code>
    * _static_
        * [.getBySymbol(symbol)](#Fundamentals.getBySymbol) ⇒ [<code>Promise.&lt;Fundamentals&gt;</code>](#Fundamentals)
        * [.getBySymbolArray(array)](#Fundamentals.getBySymbolArray) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getByURL(url)](#Fundamentals.getByURL) ⇒ [<code>Promise.&lt;Fundamentals&gt;</code>](#Fundamentals)

<a name="new_Fundamentals_new"></a>

### new Fundamentals(object)
Creates a new Fundamentals object.


| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="Fundamentals+getOpen"></a>

### fundamentals.getOpen() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+getHigh"></a>

### fundamentals.getHigh() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+getLow"></a>

### fundamentals.getLow() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+getVolume"></a>

### fundamentals.getVolume() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+getAverageVolume"></a>

### fundamentals.getAverageVolume() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+get52WeekHigh"></a>

### fundamentals.get52WeekHigh() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+get52WeekLow"></a>

### fundamentals.get52WeekLow() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+getMarketCap"></a>

### fundamentals.getMarketCap() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+getDividendYield"></a>

### fundamentals.getDividendYield() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+getPERatio"></a>

### fundamentals.getPERatio() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals+getDescription"></a>

### fundamentals.getDescription() ⇒ <code>String</code>
**Kind**: instance method of [<code>Fundamentals</code>](#Fundamentals)  
<a name="Fundamentals.getBySymbol"></a>

### Fundamentals.getBySymbol(symbol) ⇒ [<code>Promise.&lt;Fundamentals&gt;</code>](#Fundamentals)
Returns a fundamentals object for the given symbol.

**Kind**: static method of [<code>Fundamentals</code>](#Fundamentals)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Fundamentals.getBySymbolArray"></a>

### Fundamentals.getBySymbolArray(array) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of fundamentals objects for the symbols in the given array.

**Kind**: static method of [<code>Fundamentals</code>](#Fundamentals)  

| Param | Type |
| --- | --- |
| array | <code>Array</code> | 

<a name="Fundamentals.getByURL"></a>

### Fundamentals.getByURL(url) ⇒ [<code>Promise.&lt;Fundamentals&gt;</code>](#Fundamentals)
Returns a fundamentals object for the given URL.

**Kind**: static method of [<code>Fundamentals</code>](#Fundamentals)  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

<a name="Instrument"></a>

## Instrument
**Kind**: global class  

* [Instrument](#Instrument)
    * [new Instrument(object)](#new_Instrument_new)
    * _instance_
        * [.populate()](#Instrument+populate) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getMarket()](#Instrument+getMarket) ⇒ [<code>Promise.&lt;Market&gt;</code>](#Market)
        * [.getFundamentals()](#Instrument+getFundamentals) ⇒ [<code>Promise.&lt;Fundamentals&gt;</code>](#Fundamentals)
        * [.getQuote()](#Instrument+getQuote) ⇒ <code>Promise.&lt;Quote&gt;</code>
        * [.getSplits()](#Instrument+getSplits) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getName()](#Instrument+getName) ⇒ <code>String</code>
        * [.getSimpleName()](#Instrument+getSimpleName) ⇒ <code>String</code>
        * [.getSymbol()](#Instrument+getSymbol) ⇒ <code>String</code>
        * [.getListDate()](#Instrument+getListDate) ⇒ <code>Date</code>
        * [.getCountry()](#Instrument+getCountry) ⇒ <code>String</code>
        * [.getType()](#Instrument+getType) ⇒ <code>String</code>
        * [.getBloombergID()](#Instrument+getBloombergID) ⇒ <code>String</code>
        * [.getState()](#Instrument+getState) ⇒ <code>String</code>
        * [.getID()](#Instrument+getID) ⇒ <code>String</code>
        * [.getMarginInitialRatio()](#Instrument+getMarginInitialRatio) ⇒ <code>Number</code>
        * [.getDayTradeRatio()](#Instrument+getDayTradeRatio) ⇒ <code>Number</code>
        * [.getMaintenanceRatio()](#Instrument+getMaintenanceRatio) ⇒ <code>Number</code>
        * [.isTradeable()](#Instrument+isTradeable) ⇒ <code>Boolean</code>
        * [.isStock()](#Instrument+isStock) ⇒ <code>Boolean</code>
        * [.isETP()](#Instrument+isETP) ⇒ <code>Boolean</code>
        * [.isADR()](#Instrument+isADR) ⇒ <code>Boolean</code>
    * _static_
        * [.getAll()](#Instrument.getAll) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getBySymbol(symbol)](#Instrument.getBySymbol) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
        * [.getByURL(instrumentURL)](#Instrument.getByURL) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)

<a name="new_Instrument_new"></a>

### new Instrument(object)
Creates a new Instrument object.


| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="Instrument+populate"></a>

### instrument.populate() ⇒ <code>Promise.&lt;Array&gt;</code>
Fills the instrument object with market, fundamental, quote, and split data. Returns an array of Market, Fundamentals, Quote, and Splits objects.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getMarket"></a>

### instrument.getMarket() ⇒ [<code>Promise.&lt;Market&gt;</code>](#Market)
Returns an object with information on the market that this instrument trades on.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getFundamentals"></a>

### instrument.getFundamentals() ⇒ [<code>Promise.&lt;Fundamentals&gt;</code>](#Fundamentals)
Returns a new Fundamentals object with information such as open, high, low, close, volume, market cap, and more, on this instrument.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getQuote"></a>

### instrument.getQuote() ⇒ <code>Promise.&lt;Quote&gt;</code>
Returns an object with a real-time quote on this instrument.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getSplits"></a>

### instrument.getSplits() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing details on past stock splits.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getName"></a>

### instrument.getName() ⇒ <code>String</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getSimpleName"></a>

### instrument.getSimpleName() ⇒ <code>String</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getSymbol"></a>

### instrument.getSymbol() ⇒ <code>String</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getListDate"></a>

### instrument.getListDate() ⇒ <code>Date</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getCountry"></a>

### instrument.getCountry() ⇒ <code>String</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getType"></a>

### instrument.getType() ⇒ <code>String</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getBloombergID"></a>

### instrument.getBloombergID() ⇒ <code>String</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getState"></a>

### instrument.getState() ⇒ <code>String</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getID"></a>

### instrument.getID() ⇒ <code>String</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getMarginInitialRatio"></a>

### instrument.getMarginInitialRatio() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getDayTradeRatio"></a>

### instrument.getDayTradeRatio() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getMaintenanceRatio"></a>

### instrument.getMaintenanceRatio() ⇒ <code>Number</code>
**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+isTradeable"></a>

### instrument.isTradeable() ⇒ <code>Boolean</code>
Checks if the instrument is able to be traded.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+isStock"></a>

### instrument.isStock() ⇒ <code>Boolean</code>
Checks if the instrument is a stock.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+isETP"></a>

### instrument.isETP() ⇒ <code>Boolean</code>
Checks if the instrument is an exchange traded product.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+isADR"></a>

### instrument.isADR() ⇒ <code>Boolean</code>
Checks if the instrument is an American Depositary Receipt. Typically applies to foreign companies.
https://www.investopedia.com/terms/a/adr.asp

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument.getAll"></a>

### Instrument.getAll() ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of all available instruments.
WARNING: this will take a while!

**Kind**: static method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument.getBySymbol"></a>

### Instrument.getBySymbol(symbol) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
Returns an instrument object for the specified symbol.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Instrument.getByURL"></a>

### Instrument.getByURL(instrumentURL) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
Returns an instrument object for the specified instrument URL.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| instrumentURL | <code>String</code> | 

<a name="Market"></a>

## Market
**Kind**: global class  

* [Market](#Market)
    * [new Market(object)](#new_Market_new)
    * _instance_
        * [.getNextTradingHours()](#Market+getNextTradingHours) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getPreviousTradingHours()](#Market+getPreviousTradingHours) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getHoursOn(date)](#Market+getHoursOn) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getWebsite()](#Market+getWebsite) ⇒ <code>String</code>
        * [.getCity()](#Market+getCity) ⇒ <code>String</code>
        * [.getName()](#Market+getName) ⇒ <code>String</code>
        * [.getCountry()](#Market+getCountry) ⇒ <code>String</code>
        * [.getCode()](#Market+getCode) ⇒ <code>String</code>
        * [.getAcronym()](#Market+getAcronym) ⇒ <code>String</code>
        * [.getHours()](#Market+getHours) ⇒ <code>Object</code>
        * [.getClose()](#Market+getClose) ⇒ <code>Date</code>
        * [.getOpen()](#Market+getOpen) ⇒ <code>Date</code>
        * [.getExtendedClose()](#Market+getExtendedClose) ⇒ <code>Date</code>
        * [.getExtendedOpen()](#Market+getExtendedOpen) ⇒ <code>Date</code>
        * [.isOpen()](#Market+isOpen) ⇒ <code>Boolean</code>
    * _static_
        * [.getByMIC(code)](#Market.getByMIC)
        * [.getByURL(url)](#Market.getByURL)

<a name="new_Market_new"></a>

### new Market(object)
Creates a new Market object.


| Param |
| --- |
| object | 

<a name="Market+getNextTradingHours"></a>

### market.getNextTradingHours() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object with hours on the next trading period.

**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getPreviousTradingHours"></a>

### market.getPreviousTradingHours() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object with hours on the previous trading period.

**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getHoursOn"></a>

### market.getHoursOn(date) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object with hours for the given date.

**Kind**: instance method of [<code>Market</code>](#Market)  

| Param |
| --- |
| date | 

<a name="Market+getWebsite"></a>

### market.getWebsite() ⇒ <code>String</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getCity"></a>

### market.getCity() ⇒ <code>String</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getName"></a>

### market.getName() ⇒ <code>String</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getCountry"></a>

### market.getCountry() ⇒ <code>String</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getCode"></a>

### market.getCode() ⇒ <code>String</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getAcronym"></a>

### market.getAcronym() ⇒ <code>String</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getHours"></a>

### market.getHours() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getClose"></a>

### market.getClose() ⇒ <code>Date</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getOpen"></a>

### market.getOpen() ⇒ <code>Date</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getExtendedClose"></a>

### market.getExtendedClose() ⇒ <code>Date</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getExtendedOpen"></a>

### market.getExtendedOpen() ⇒ <code>Date</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+isOpen"></a>

### market.isOpen() ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market.getByMIC"></a>

### Market.getByMIC(code)
Returns a Market object for the given Market Identifier Code (MIC).

**Kind**: static method of [<code>Market</code>](#Market)  

| Param | Type |
| --- | --- |
| code | <code>String</code> | 

<a name="Market.getByURL"></a>

### Market.getByURL(url)
Returns a Market object for the given market URL.

**Kind**: static method of [<code>Market</code>](#Market)  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

<a name="OptionOrder"></a>

## OptionOrder
**Kind**: global class  

* [OptionOrder](#OptionOrder)
    * [new OptionOrder(object, user, optionInstrument, direction, timeInForce, side, type, quantity)](#new_OptionOrder_new)
    * [.getLegs()](#OptionOrder+getLegs) ⇒ <code>Array</code>
    * [.getDirection()](#OptionOrder+getDirection) ⇒ <code>String</code>
    * [.getPremium()](#OptionOrder+getPremium) ⇒ <code>Number</code>
    * [.getProcessedPremium()](#OptionOrder+getProcessedPremium) ⇒ <code>Number</code>
    * [.getTimeInForce()](#OptionOrder+getTimeInForce) ⇒ <code>String</code>
    * [.getReferenceID()](#OptionOrder+getReferenceID) ⇒ <code>String</code>
    * [.getPrice()](#OptionOrder+getPrice) ⇒ <code>Number</code>
    * [.getTrigger()](#OptionOrder+getTrigger) ⇒ <code>String</code>
    * [.getType()](#OptionOrder+getType) ⇒ <code>String</code>
    * [.getQuantity()](#OptionOrder+getQuantity) ⇒ <code>Number</code>
    * [.getQuantityPending()](#OptionOrder+getQuantityPending) ⇒ <code>Number</code>
    * [.getQuantityCanceled()](#OptionOrder+getQuantityCanceled) ⇒ <code>Number</code>
    * [.getChainID()](#OptionOrder+getChainID) ⇒ <code>String</code>
    * [.getSymbol()](#OptionOrder+getSymbol) ⇒ <code>String</code>
    * [.getDateCreated()](#OptionOrder+getDateCreated) ⇒ <code>Date</code>
    * [.isExecuted()](#OptionOrder+isExecuted) ⇒ <code>Boolean</code>
    * [.isCredit()](#OptionOrder+isCredit) ⇒ <code>Boolean</code>
    * [.isDebit()](#OptionOrder+isDebit) ⇒ <code>Boolean</code>

<a name="new_OptionOrder_new"></a>

### new OptionOrder(object, user, optionInstrument, direction, timeInForce, side, type, quantity)
Creates a new OptionOrder class.


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Null</code> | Object for previously created order. If this is a new order, this should be null. |
| user | [<code>User</code>](#User) |  |
| optionInstrument | <code>OptionInstrument</code> |  |
| direction | <code>String</code> | debit, credit |
| timeInForce | <code>String</code> | 'GFD' / 'GTC' / 'IOC' / 'OPG' |
| side | <code>String</code> | 'buy' / 'sell' |
| type | <code>String</code> | 'limit' / 'market' |
| quantity | <code>Number</code> |  |

<a name="OptionOrder+getLegs"></a>

### optionOrder.getLegs() ⇒ <code>Array</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getDirection"></a>

### optionOrder.getDirection() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getPremium"></a>

### optionOrder.getPremium() ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getProcessedPremium"></a>

### optionOrder.getProcessedPremium() ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getTimeInForce"></a>

### optionOrder.getTimeInForce() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getReferenceID"></a>

### optionOrder.getReferenceID() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getPrice"></a>

### optionOrder.getPrice() ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getTrigger"></a>

### optionOrder.getTrigger() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getType"></a>

### optionOrder.getType() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getQuantity"></a>

### optionOrder.getQuantity() ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getQuantityPending"></a>

### optionOrder.getQuantityPending() ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getQuantityCanceled"></a>

### optionOrder.getQuantityCanceled() ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getChainID"></a>

### optionOrder.getChainID() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getSymbol"></a>

### optionOrder.getSymbol() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+getDateCreated"></a>

### optionOrder.getDateCreated() ⇒ <code>Date</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+isExecuted"></a>

### optionOrder.isExecuted() ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+isCredit"></a>

### optionOrder.isCredit() ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="OptionOrder+isDebit"></a>

### optionOrder.isDebit() ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>OptionOrder</code>](#OptionOrder)  
<a name="Order"></a>

## Order
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| instrument | [<code>Instrument</code>](#Instrument) |  |
| quote | <code>Quote</code> |  |
| type | <code>String</code> | 'limit' | 'market |
| timeInForce | <code>String</code> | 'gfd' | 'gtc' | 'ioc' | 'opg' |
| trigger | <code>String</code> | 'immediate' | 'stop' |
| stopPrice | <code>Number</code> \| <code>Null</code> | If trigger is 'stop,' this must be specified. If not, this should be null. |
| quantity | <code>Number</code> |  |
| side | <code>String</code> | 'buy' | 'sell' |
| extendedHours | <code>Boolean</code> | Whether the order should be allowed to execute when exchanges are closed (9-9:30 AM, 4-6 PM) |
| overrideDayTradeCheck | <code>Boolean</code> | Whether to override Pattern Day Trader protection. |


* [Order](#Order)
    * [new Order(user, object)](#new_Order_new)
    * _instance_
        * [.submit()](#Order+submit) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getResponse()](#Order+getResponse) ⇒ <code>Object</code> \| <code>Null</code>
    * _static_
        * [.getByOrderID(user, orderID)](#Order.getByOrderID) ⇒ [<code>Promise.&lt;Order&gt;</code>](#Order)
        * [.getRecentOrders(user)](#Order.getRecentOrders) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="new_Order_new"></a>

### new Order(user, object)
Creates a new Order object.


| Param | Type |
| --- | --- |
| user | [<code>User</code>](#User) | 
| object | <code>Object</code> | 

<a name="Order+submit"></a>

### order.submit() ⇒ <code>Promise.&lt;Object&gt;</code>
Submits an order to Robinhood to be executed by the exchange.

**Kind**: instance method of [<code>Order</code>](#Order)  
<a name="Order+getResponse"></a>

### order.getResponse() ⇒ <code>Object</code> \| <code>Null</code>
If an order has been executed, this will return the response object.

**Kind**: instance method of [<code>Order</code>](#Order)  
<a name="Order.getByOrderID"></a>

### Order.getByOrderID(user, orderID) ⇒ [<code>Promise.&lt;Order&gt;</code>](#Order)
Returns a new order object for the specified order ID, if found.

**Kind**: static method of [<code>Order</code>](#Order)  

| Param | Type |
| --- | --- |
| user | [<code>User</code>](#User) | 
| orderID | <code>String</code> | 

<a name="Order.getRecentOrders"></a>

### Order.getRecentOrders(user) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of recent orders for the given user object.

**Kind**: static method of [<code>Order</code>](#Order)  

| Param | Type |
| --- | --- |
| user | [<code>User</code>](#User) | 

<a name="Portfolio"></a>

## Portfolio
**Kind**: global class  

* [Portfolio](#Portfolio)
    * [new Portfolio(array)](#new_Portfolio_new)
    * [.getInstrumentArray()](#Portfolio+getInstrumentArray) ⇒ <code>Array</code>
    * [.getSymbols()](#Portfolio+getSymbols) ⇒ <code>Array</code>
    * [.getBuyPrice(symbol)](#Portfolio+getBuyPrice) ⇒ <code>Number</code>
    * [.getQuantity(symbol)](#Portfolio+getQuantity) ⇒ <code>Number</code>
    * [.getSharesHeld(symbol)](#Portfolio+getSharesHeld) ⇒ <code>Number</code>
    * [.getPurchaseDate(symbol)](#Portfolio+getPurchaseDate) ⇒ <code>Date</code>
    * [.getLastTradeDate(symbol)](#Portfolio+getLastTradeDate) ⇒ <code>Date</code>
    * [.getBySymbol(symbol)](#Portfolio+getBySymbol) ⇒ <code>Object</code>
    * [.getBySymbols(array)](#Portfolio+getBySymbols) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getQuantityGreaterThan(size)](#Portfolio+getQuantityGreaterThan) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getQuantityLessThan(size)](#Portfolio+getQuantityLessThan) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getQuantityEqualTo(size)](#Portfolio+getQuantityEqualTo) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getPurchasedAfter(date)](#Portfolio+getPurchasedAfter) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getPurchasedBefore(date)](#Portfolio+getPurchasedBefore) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getPurchasedOn(date)](#Portfolio+getPurchasedOn) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getPriceGreaterThan(amount)](#Portfolio+getPriceGreaterThan) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getPriceLessThan(amount)](#Portfolio+getPriceLessThan) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getPriceEqualTo(amount)](#Portfolio+getPriceEqualTo) ⇒ <code>Array.&lt;Object&gt;</code>

<a name="new_Portfolio_new"></a>

### new Portfolio(array)
Creates a new Portfolio object.


| Param |
| --- |
| array | 

<a name="Portfolio+getInstrumentArray"></a>

### portfolio.getInstrumentArray() ⇒ <code>Array</code>
Returns an array of all instruments in the user's portfolio.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  
<a name="Portfolio+getSymbols"></a>

### portfolio.getSymbols() ⇒ <code>Array</code>
Returns an array of all symbols in the user's portfolio.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  
<a name="Portfolio+getBuyPrice"></a>

### portfolio.getBuyPrice(symbol) ⇒ <code>Number</code>
Returns the average buy price for the given symbol.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Portfolio+getQuantity"></a>

### portfolio.getQuantity(symbol) ⇒ <code>Number</code>
Returns the quantity owned of the given symbol.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Portfolio+getSharesHeld"></a>

### portfolio.getSharesHeld(symbol) ⇒ <code>Number</code>
Get total shares held for the given symbol.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Portfolio+getPurchaseDate"></a>

### portfolio.getPurchaseDate(symbol) ⇒ <code>Date</code>
Returns the date of original purchase for the given symbol.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Portfolio+getLastTradeDate"></a>

### portfolio.getLastTradeDate(symbol) ⇒ <code>Date</code>
Returns the date of last trade for the given symbol.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Portfolio+getBySymbol"></a>

### portfolio.getBySymbol(symbol) ⇒ <code>Object</code>
Returns an object containing the user's position in the given symbol.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Portfolio+getBySymbols"></a>

### portfolio.getBySymbols(array) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of objects containing the user's positions in the given symbols.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| array | <code>Array</code> | 

<a name="Portfolio+getQuantityGreaterThan"></a>

### portfolio.getQuantityGreaterThan(size) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions greater than the given amount.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| size | <code>Number</code> | 

<a name="Portfolio+getQuantityLessThan"></a>

### portfolio.getQuantityLessThan(size) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions less than the given amount.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| size | <code>Number</code> | 

<a name="Portfolio+getQuantityEqualTo"></a>

### portfolio.getQuantityEqualTo(size) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions equal to than the given amount.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| size | <code>Number</code> | 

<a name="Portfolio+getPurchasedAfter"></a>

### portfolio.getPurchasedAfter(date) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions opened after the given date (UTC).

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Compared with UTC time. |

<a name="Portfolio+getPurchasedBefore"></a>

### portfolio.getPurchasedBefore(date) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions opened before the given date (UTC).

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Compared with UTC time. |

<a name="Portfolio+getPurchasedOn"></a>

### portfolio.getPurchasedOn(date) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions opened on the given date (UTC).

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Compared with UTC time. |

<a name="Portfolio+getPriceGreaterThan"></a>

### portfolio.getPriceGreaterThan(amount) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions with an average buy price greater than the given amount.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| amount | <code>Number</code> | 

<a name="Portfolio+getPriceLessThan"></a>

### portfolio.getPriceLessThan(amount) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions with an average buy price less than the given amount.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| amount | <code>Number</code> | 

<a name="Portfolio+getPriceEqualTo"></a>

### portfolio.getPriceEqualTo(amount) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of all positions with an average buy price equal to the given amount.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| amount | <code>Number</code> | 

<a name="User"></a>

## User
**Kind**: global class  

* [User](#User)
    * [new User(username, password)](#new_User_new)
    * [.authenticate()](#User+authenticate) ⇒ <code>Promise</code>
    * [.getAccount()](#User+getAccount) ⇒ <code>Promise</code>
    * [.getUserInfo()](#User+getUserInfo) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getTaxInfo()](#User+getTaxInfo) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getDisclosureInfo()](#User+getDisclosureInfo) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getEmployerInfo()](#User+getEmployerInfo) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getInvestmentProfile()](#User+getInvestmentProfile) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getRecentDayTrades()](#User+getRecentDayTrades) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getPortfolio()](#User+getPortfolio) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getLinkedBanks()](#User+getLinkedBanks) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.addDeposit(bankID, amount, frequency)](#User+addDeposit) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_User_new"></a>

### new User(username, password)
Creates a new User object.


| Param | Type |
| --- | --- |
| username | <code>String</code> | 
| password | <code>String</code> | 

<a name="User+authenticate"></a>

### user.authenticate() ⇒ <code>Promise</code>
Authenticates a user using the inputted username and password.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getAccount"></a>

### user.getAccount() ⇒ <code>Promise</code>
Returns vital information about balances and enabled features.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getUserInfo"></a>

### user.getUserInfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns information like username, first / last name, creation date, id, and more.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getTaxInfo"></a>

### user.getTaxInfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns information like address, citizenship, SSN, date of birth, and more.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getDisclosureInfo"></a>

### user.getDisclosureInfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns information on the user pertaining to SEC rule 405.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getEmployerInfo"></a>

### user.getEmployerInfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns information on the user's employment.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getInvestmentProfile"></a>

### user.getInvestmentProfile() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the user's answers to basic questions regarding investment experiences.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getRecentDayTrades"></a>

### user.getRecentDayTrades() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns arrays of recent option and equity day trades.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getPortfolio"></a>

### user.getPortfolio() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns a Portfolio object containing all open positions in a user's portfolio.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getLinkedBanks"></a>

### user.getLinkedBanks() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object representing the user's linked bank account. If the user has linked multiple, this returns an array.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+addDeposit"></a>

### user.addDeposit(bankID, amount, frequency) ⇒ <code>Promise.&lt;Object&gt;</code>
Deposits money into the user's account. If frequency is not empty, this becomes an automatic deposit.

**Kind**: instance method of [<code>User</code>](#User)  

| Param | Type | Description |
| --- | --- | --- |
| bankID | <code>String</code> | This ID can be found from getLinkedBanks(). |
| amount | <code>String</code> | How much money should be deposited, represented as a string. |
| frequency | <code>String</code> | Empty string if one-time deposit, otherwise: 'weekly,' 'biweekly,' 'monthly,' or 'quarterly.' |

