## Classes

<dl>
<dt><a href="#Backtest">Backtest</a></dt>
<dd><p>Incomplete</p>
</dd>
<dt><a href="#Scheduler">Scheduler</a></dt>
<dd><p>Used to run functions at specified intervals or times of day.</p>
</dd>
</dl>

<a name="Backtest"></a>

## Backtest
Incomplete

**Kind**: global class  
<a name="Backtest+run"></a>

### backtest.run(minute) ⇒ <code>Promise.&lt;Object&gt;</code>
Runs a backtest on the given algorithm.

**Kind**: instance method of [<code>Backtest</code>](#Backtest)  

| Param |
| --- |
| minute | 

<a name="Scheduler"></a>

## Scheduler
Used to run functions at specified intervals or times of day.

**Kind**: global class  

* [Scheduler](#Scheduler)
    * [new Scheduler(f)](#new_Scheduler_new)
    * [.onMarketOpen(offset)](#Scheduler+onMarketOpen) ⇒ <code>Promise.&lt;Date&gt;</code>
    * [.onMarketClose(offset)](#Scheduler+onMarketClose) ⇒ <code>Promise.&lt;schedule&gt;</code>
    * [.every(minutes, extended)](#Scheduler+every)
    * [.cancel()](#Scheduler+cancel)
    * [.getNext()](#Scheduler+getNext) ⇒ <code>Date</code> \| <code>Error</code>

<a name="new_Scheduler_new"></a>

### new Scheduler(f)
Creates a new scheduled task


| Param | Type |
| --- | --- |
| f | <code>function</code> | 

<a name="Scheduler+onMarketOpen"></a>

### scheduler.onMarketOpen(offset) ⇒ <code>Promise.&lt;Date&gt;</code>
Runs every day on market open.

**Kind**: instance method of [<code>Scheduler</code>](#Scheduler)  
**Returns**: <code>Promise.&lt;Date&gt;</code> - - Date object of next invocation.  
**Author**: Torrey Leonard <https://github.com/Ladinn>  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>Number</code> | The offset, in milliseconds, from market open to run the algorithm. Negative is before, positive is after. |

<a name="Scheduler+onMarketClose"></a>

### scheduler.onMarketClose(offset) ⇒ <code>Promise.&lt;schedule&gt;</code>
Runs every day on market close.

**Kind**: instance method of [<code>Scheduler</code>](#Scheduler)  
**Author**: Torrey Leonard <https://github.com/Ladinn>  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>Number</code> | The offset, in milliseconds, from market close to run the algorithm. Negative is before, positive is after. |

<a name="Scheduler+every"></a>

### scheduler.every(minutes, extended)
Runs every 'x' minutes while the market is open.

**Kind**: instance method of [<code>Scheduler</code>](#Scheduler)  
**Author**: Torrey Leonard <https://github.com/Ladinn>  

| Param | Type | Description |
| --- | --- | --- |
| minutes | <code>Number</code> |  |
| extended | <code>Boolean</code> | Whether to run during extended trading hours. |

<a name="Scheduler+cancel"></a>

### scheduler.cancel()
Cancels a job.

**Kind**: instance method of [<code>Scheduler</code>](#Scheduler)  
**Author**: Torrey Leonard <https://github.com/Ladinn>  
<a name="Scheduler+getNext"></a>

### scheduler.getNext() ⇒ <code>Date</code> \| <code>Error</code>
Returns the date of the next invocation of the given job.

**Kind**: instance method of [<code>Scheduler</code>](#Scheduler)  
**Author**: Torrey Leonard <https://github.com/Ladinn>  
