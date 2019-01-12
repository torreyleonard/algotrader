## Classes

<dl>
<dt><a href="#Fundamentals">Fundamentals</a></dt>
<dd><p>Market data for the given equity, such as market cap, dividend yield, P/E ratio, description, and more.</p>
</dd>
<dt><a href="#Instrument">Instrument</a></dt>
<dd><p>Represents a security traded on Robinhood.</p>
</dd>
<dt><a href="#Market">Market</a></dt>
<dd><p>Represents an exchange on which securities are traded.</p>
</dd>
<dt><a href="#OptionInstrument">OptionInstrument</a></dt>
<dd><p>BETA: Represents an option traded on Robinhood.</p>
</dd>
<dt><a href="#OptionOrder">OptionOrder</a></dt>
<dd><p>BETA: Represents and executes an order for the given option contract.</p>
</dd>
<dt><a href="#Order">Order</a></dt>
<dd><p>Represents and executes an order for the given instrument.</p>
</dd>
<dt><a href="#Portfolio">Portfolio</a></dt>
<dd><p>Represents all of the user&#39;s holdings on Robinhood and allows for various queries.</p>
</dd>
<dt><a href="#User">User</a></dt>
<dd><p>Represents the user that is logged in while accessing the Robinhood API.</p>
</dd>
</dl>

<a name="Fundamentals"></a>

## Fundamentals
Market data for the given equity, such as market cap, dividend yield, P/E ratio, description, and more.

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
Represents a security traded on Robinhood.

**Kind**: global class  

* [Instrument](#Instrument)
    * [new Instrument(object)](#new_Instrument_new)
    * _instance_
        * [.populate()](#Instrument+populate) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getMarket()](#Instrument+getMarket) ⇒ [<code>Promise.&lt;Market&gt;</code>](#Market)
        * [.getFundamentals()](#Instrument+getFundamentals) ⇒ [<code>Promise.&lt;Fundamentals&gt;</code>](#Fundamentals)
        * [.getQuote()](#Instrument+getQuote) ⇒ <code>Promise.&lt;Quote&gt;</code>
        * [.getSplits()](#Instrument+getSplits) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getEarnings()](#Instrument+getEarnings) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getPricesPaid()](#Instrument+getPricesPaid) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getPopularity()](#Instrument+getPopularity) ⇒ <code>Promise.&lt;Number&gt;</code>
        * [.getRatings()](#Instrument+getRatings) ⇒ <code>Promise.&lt;Object&gt;</code>
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
        * [.equals(otherInstrument)](#Instrument+equals) ⇒ <code>Boolean</code>
    * _static_
        * [.getAll()](#Instrument.getAll) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getBySymbol(symbol)](#Instrument.getBySymbol) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
        * [.getByID(id)](#Instrument.getByID) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
        * [.getByURL(instrumentURL)](#Instrument.getByURL) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
        * [.getTopMoving(direction)](#Instrument.getTopMoving) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
        * [.getByIdArray(ids)](#Instrument.getByIdArray) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getCategories()](#Instrument.getCategories) ⇒ <code>Array.&lt;String&gt;</code>
        * [.getByCategory(category)](#Instrument.getByCategory) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getMostPopular()](#Instrument.getMostPopular) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getUpcomingEarnings()](#Instrument.getUpcomingEarnings) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getRecommendations(user)](#Instrument.getRecommendations) ⇒ <code>Promise.&lt;Array&gt;</code>

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
<a name="Instrument+getEarnings"></a>

### instrument.getEarnings() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing this company's past and future earnings data.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument+getPricesPaid"></a>

### instrument.getPricesPaid() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the high, low, and average prices paid for the instrument by other Robinhood users.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
**Author**: Ladinn  
**Author**: rclai (Discovered API endpoint)  
<a name="Instrument+getPopularity"></a>

### instrument.getPopularity() ⇒ <code>Promise.&lt;Number&gt;</code>
Returns the total amount of open positions on this instrument among all Robinhood users.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
**Author**: Ladinn  
**Author**: rclai (Discovered API endpoint)  
<a name="Instrument+getRatings"></a>

### instrument.getRatings() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing buy hold, and sell ratings from major financial institutions, along with text describing the rating.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
**Author**: Ladinn  
**Author**: rclai (Discovered API endpoint)  
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
<a name="Instrument+equals"></a>

### instrument.equals(otherInstrument) ⇒ <code>Boolean</code>
Check whether another instance of Instrument equals this instance.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| otherInstrument | [<code>Instrument</code>](#Instrument) | 

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

<a name="Instrument.getByID"></a>

### Instrument.getByID(id) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
Returns an instrument object for the specified Robinhood instrument ID.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Instrument.getByURL"></a>

### Instrument.getByURL(instrumentURL) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
Returns an instrument object for the specified instrument URL.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| instrumentURL | <code>String</code> | 

<a name="Instrument.getTopMoving"></a>

### Instrument.getTopMoving(direction) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
Returns an array of Instruments for 10 of the top moving S&P 500 equities.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type | Description |
| --- | --- | --- |
| direction | <code>String</code> | Possible options: [up, down] |

<a name="Instrument.getByIdArray"></a>

### Instrument.getByIdArray(ids) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of instrument objects for the specified array of IDs.

Note: large arrays will take longer to process and are capped at 50 per request, so multiple
requests will be sent as the function iterates through the array.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| ids | <code>Array</code> | 

<a name="Instrument.getCategories"></a>

### Instrument.getCategories() ⇒ <code>Array.&lt;String&gt;</code>
Returns an array of known categories that can be used with getByCategory(). This list is non-exhaustive.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument.getByCategory"></a>

### Instrument.getByCategory(category) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of Instruments related to the given category.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type | Description |
| --- | --- | --- |
| category | <code>String</code> | For possible options see getCategories(). |

<a name="Instrument.getMostPopular"></a>

### Instrument.getMostPopular() ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of Instruments for the top 100 most popular equities on Robinhood.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument.getUpcomingEarnings"></a>

### Instrument.getUpcomingEarnings() ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of Instruments that have upcoming earnings.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  
<a name="Instrument.getRecommendations"></a>

### Instrument.getRecommendations(user) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of instruments for stocks from Robinhood's recommendations for the given user.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| user | [<code>User</code>](#User) | 

<a name="Market"></a>

## Market
Represents an exchange on which securities are traded.

**Kind**: global class  

* [Market](#Market)
    * [new Market(object)](#new_Market_new)
    * _instance_
        * [.getNextTradingHours()](#Market+getNextTradingHours) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getPreviousTradingHours()](#Market+getPreviousTradingHours) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getHoursOn(date)](#Market+getHoursOn) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.isOpenOn(date)](#Market+isOpenOn) ⇒ <code>Promise.&lt;Boolean&gt;</code>
        * [.getNextOpen()](#Market+getNextOpen) ⇒ <code>Promise.&lt;Date&gt;</code>
        * [.getNextClose()](#Market+getNextClose) ⇒ <code>Promise.&lt;Date&gt;</code>
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
        * [.isOpenToday()](#Market+isOpenToday) ⇒ <code>Boolean</code>
        * [.isOpenNow()](#Market+isOpenNow) ⇒ <code>Boolean</code>
        * [.isExtendedOpenNow()](#Market+isExtendedOpenNow) ⇒ <code>Boolean</code>
    * _static_
        * [.getByMIC(code)](#Market.getByMIC)
        * [.getByURL(url)](#Market.getByURL)

<a name="new_Market_new"></a>

### new Market(object)
Creates a new Market object.


| Param | Description |
| --- | --- |
| object | Created using this class' static methods. For example, use 'getByMIC("XNAS")' to create an instance of the Nasdaq. |

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

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="Market+isOpenOn"></a>

### market.isOpenOn(date) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Checks whether the market is open on the given date.

**Kind**: instance method of [<code>Market</code>](#Market)  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="Market+getNextOpen"></a>

### market.getNextOpen() ⇒ <code>Promise.&lt;Date&gt;</code>
Returns the next date and time that the market will be open.

**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+getNextClose"></a>

### market.getNextClose() ⇒ <code>Promise.&lt;Date&gt;</code>
Returns the next date and time that the market will close.

**Kind**: instance method of [<code>Market</code>](#Market)  
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
<a name="Market+isOpenToday"></a>

### market.isOpenToday() ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+isOpenNow"></a>

### market.isOpenNow() ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market+isExtendedOpenNow"></a>

### market.isExtendedOpenNow() ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>Market</code>](#Market)  
<a name="Market.getByMIC"></a>

### Market.getByMIC(code)
Returns a Market object for the given Market Identifier Code (MIC).
See ISO 10383: https://www.iso20022.org/10383/iso-10383-market-identifier-codes

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

<a name="OptionInstrument"></a>

## OptionInstrument
BETA: Represents an option traded on Robinhood.

**Kind**: global class  

* [OptionInstrument](#OptionInstrument)
    * _instance_
        * [.getTradability()](#OptionInstrument+getTradability) ⇒ <code>String</code>
        * [.getStrikePrice()](#OptionInstrument+getStrikePrice) ⇒ <code>Number</code>
        * [.getState()](#OptionInstrument+getState) ⇒ <code>String</code>
        * [.getType()](#OptionInstrument+getType) ⇒ <code>String</code>
        * [.getSymbol()](#OptionInstrument+getSymbol) ⇒ <code>String</code>
        * [.getMiniumumTicks()](#OptionInstrument+getMiniumumTicks) ⇒ <code>Object</code>
        * [.getChainID()](#OptionInstrument+getChainID) ⇒ <code>String</code>
        * [.getOptionID()](#OptionInstrument+getOptionID) ⇒ <code>String</code>
        * [.getExpiration()](#OptionInstrument+getExpiration) ⇒ <code>Date</code>
    * _static_
        * [.getBySymbol(user, symbol, cache)](#OptionInstrument.getBySymbol) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getByURL(user, url)](#OptionInstrument.getByURL) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)

<a name="OptionInstrument+getTradability"></a>

### optionInstrument.getTradability() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument+getStrikePrice"></a>

### optionInstrument.getStrikePrice() ⇒ <code>Number</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument+getState"></a>

### optionInstrument.getState() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument+getType"></a>

### optionInstrument.getType() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument+getSymbol"></a>

### optionInstrument.getSymbol() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument+getMiniumumTicks"></a>

### optionInstrument.getMiniumumTicks() ⇒ <code>Object</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument+getChainID"></a>

### optionInstrument.getChainID() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument+getOptionID"></a>

### optionInstrument.getOptionID() ⇒ <code>String</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument+getExpiration"></a>

### optionInstrument.getExpiration() ⇒ <code>Date</code>
**Kind**: instance method of [<code>OptionInstrument</code>](#OptionInstrument)  
<a name="OptionInstrument.getBySymbol"></a>

### OptionInstrument.getBySymbol(user, symbol, cache) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of options instruments for the specified symbol.
WARNING: As there is no apparent way to query Robinhood options by symbol, all instruments will be downloaded and filtered. This will take a while on first run. After, set 'cache' to true.

**Kind**: static method of [<code>OptionInstrument</code>](#OptionInstrument)  

| Param | Type |
| --- | --- |
| user | [<code>User</code>](#User) | 
| symbol | <code>String</code> | 
| cache | <code>Boolean</code> | 

<a name="OptionInstrument.getByURL"></a>

### OptionInstrument.getByURL(user, url) ⇒ [<code>Promise.&lt;Instrument&gt;</code>](#Instrument)
Returns an options instrument object for the specified instrument URL.

**Kind**: static method of [<code>OptionInstrument</code>](#OptionInstrument)  

| Param | Type |
| --- | --- |
| user | [<code>User</code>](#User) | 
| url | <code>String</code> | 

<a name="OptionOrder"></a>

## OptionOrder
BETA: Represents and executes an order for the given option contract.

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
| optionInstrument | [<code>OptionInstrument</code>](#OptionInstrument) |  |
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
Represents and executes an order for the given instrument.

**Kind**: global class  

* [Order](#Order)
    * [new Order(user, object)](#new_Order_new)
    * _instance_
        * [.submit()](#Order+submit) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.cancel()](#Order+cancel) ⇒ <code>Promise.&lt;Object&gt;</code>
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
<a name="Order+cancel"></a>

### order.cancel() ⇒ <code>Promise.&lt;Object&gt;</code>
Attempts to cancel an order.

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
Represents all of the user's holdings on Robinhood and allows for various queries.

**Kind**: global class  

* [Portfolio](#Portfolio)
    * [new Portfolio(user, array)](#new_Portfolio_new)
    * [.sellAll()](#Portfolio+sellAll) ⇒ <code>Promise.&lt;(Boolean\|Error)&gt;</code>
    * [.setQuantity(symbol, targetQuantity)](#Portfolio+setQuantity) ⇒ [<code>Promise.&lt;Order&gt;</code>](#Order)
    * [.getStockValue()](#Portfolio+getStockValue) ⇒ <code>Promise.&lt;Number&gt;</code>
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

### new Portfolio(user, array)
Creates a new Portfolio object.


| Param | Type | Description |
| --- | --- | --- |
| user | [<code>User</code>](#User) |  |
| array | <code>Array</code> | Created via User.getPortfolio() |

<a name="Portfolio+sellAll"></a>

### portfolio.sellAll() ⇒ <code>Promise.&lt;(Boolean\|Error)&gt;</code>
Sells all positions in the user's portfolio at the market price.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  
<a name="Portfolio+setQuantity"></a>

### portfolio.setQuantity(symbol, targetQuantity) ⇒ [<code>Promise.&lt;Order&gt;</code>](#Order)
Executes a new order to reduce or increase the user's position in the given symbol by the given amount.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 
| targetQuantity | <code>Number</code> | 

<a name="Portfolio+getStockValue"></a>

### portfolio.getStockValue() ⇒ <code>Promise.&lt;Number&gt;</code>
Returns the total market value of all stocks held by the user.

**Kind**: instance method of [<code>Portfolio</code>](#Portfolio)  
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
Represents the user that is logged in while accessing the Robinhood API.

**Kind**: global class  

* [User](#User)
    * [new User(username, password)](#new_User_new)
    * [.authenticate(mfaFunction)](#User+authenticate) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.logout()](#User+logout) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.getAccount()](#User+getAccount) ⇒ <code>Promise</code>
    * [.getBalances()](#User+getBalances) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getBuyingPower()](#User+getBuyingPower) ⇒ <code>Promise</code>
    * [.getUserInfo()](#User+getUserInfo) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getUID()](#User+getUID) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.getTaxInfo()](#User+getTaxInfo) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getDisclosureInfo()](#User+getDisclosureInfo) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getEmployerInfo()](#User+getEmployerInfo) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getInvestmentProfile()](#User+getInvestmentProfile) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getRecentDayTrades()](#User+getRecentDayTrades) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getRecentOrders()](#User+getRecentOrders) ⇒ <code>Promise.&lt;Array.&lt;Order&gt;&gt;</code>
    * [.cancelOpenOrders()](#User+cancelOpenOrders) ⇒ <code>Promise</code>
    * [.getRecentOptionOrders()](#User+getRecentOptionOrders) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getPortfolio()](#User+getPortfolio) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getHistoricals()](#User+getHistoricals) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getLinkedBanks()](#User+getLinkedBanks) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.addDeposit(bankID, amount, frequency)](#User+addDeposit) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getDocuments()](#User+getDocuments) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.downloadDocuments(folder)](#User+downloadDocuments) ⇒ <code>Promise</code>

<a name="new_User_new"></a>

### new User(username, password)
Creates a new User object.


| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> |  |
| password | <code>String</code> | Optional. If not provided the user will be prompted via CLI. |

<a name="User+authenticate"></a>

### user.authenticate(mfaFunction) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Authenticates a user using the inputted username and password.

**Kind**: instance method of [<code>User</code>](#User)  

| Param | Type | Description |
| --- | --- | --- |
| mfaFunction | <code>function</code> \| <code>Null</code> | Optional function that is called when prompted for multi-factor authentication. Must return a promise with a six-character string. If not provided the CLI will be prompted. |

<a name="User+logout"></a>

### user.logout() ⇒ <code>Promise.&lt;Boolean&gt;</code>
Logout the user by expiring the authentication token.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getAccount"></a>

### user.getAccount() ⇒ <code>Promise</code>
Returns vital information about balances and enabled features.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getBalances"></a>

### user.getBalances() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing details on the user's cash and marginbalance.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getBuyingPower"></a>

### user.getBuyingPower() ⇒ <code>Promise</code>
Returns the amount of money available to be spent.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getUserInfo"></a>

### user.getUserInfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns information like username, first / last name, creation date, id, and more.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getUID"></a>

### user.getUID() ⇒ <code>Promise.&lt;String&gt;</code>
Returns the user's unique ID.

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
<a name="User+getRecentOrders"></a>

### user.getRecentOrders() ⇒ <code>Promise.&lt;Array.&lt;Order&gt;&gt;</code>
Returns an array of recent orders.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+cancelOpenOrders"></a>

### user.cancelOpenOrders() ⇒ <code>Promise</code>
Cancels all open orders.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getRecentOptionOrders"></a>

### user.getRecentOptionOrders() ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of recent option orders.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getPortfolio"></a>

### user.getPortfolio() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns a Portfolio object containing all open positions in a user's portfolio.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+getHistoricals"></a>

### user.getHistoricals() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object that can be used to create a chart, show total return, etc.

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

<a name="User+getDocuments"></a>

### user.getDocuments() ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of account documents (taxes, statements, etc). Use 'downloadDocuments()' to view them.

**Kind**: instance method of [<code>User</code>](#User)  
<a name="User+downloadDocuments"></a>

### user.downloadDocuments(folder) ⇒ <code>Promise</code>
Downloads all account documents to the given folder path.
Note that, because of Robinhood's connection throttling, this will take a while for accounts with high activity.
Downloads will be attempted every second and will wait for any connection throttling to end before continuing.

**Kind**: instance method of [<code>User</code>](#User)  

| Param | Type |
| --- | --- |
| folder | <code>String</code> | 

