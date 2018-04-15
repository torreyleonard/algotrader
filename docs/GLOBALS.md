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
