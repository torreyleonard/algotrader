<a name="Scheduler"></a>

## Scheduler
Used to run functions at specified intervals or times of day.

**Kind**: global class  

* [Scheduler](#Scheduler)
    * [.onMarketOpen(offset, f)](#Scheduler.onMarketOpen) ⇒ <code>Promise.&lt;schedule&gt;</code>
    * [.onMarketClose(offset, f)](#Scheduler.onMarketClose) ⇒ <code>Promise.&lt;schedule&gt;</code>
    * [.every(minutes, extended, f)](#Scheduler.every)
    * [.cancel(schedule)](#Scheduler.cancel)
    * [.getNext(schedule)](#Scheduler.getNext) ⇒ <code>Date</code>

<a name="Scheduler.onMarketOpen"></a>

### Scheduler.onMarketOpen(offset, f) ⇒ <code>Promise.&lt;schedule&gt;</code>
Runs every day on market open.

**Kind**: static method of [<code>Scheduler</code>](#Scheduler)  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>Number</code> | The offset, in milliseconds, from market open to run the algorithm. Negative is before, positive is after. |
| f | <code>function</code> | The function to run. |

<a name="Scheduler.onMarketClose"></a>

### Scheduler.onMarketClose(offset, f) ⇒ <code>Promise.&lt;schedule&gt;</code>
Runs every day on market close.

**Kind**: static method of [<code>Scheduler</code>](#Scheduler)  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>Number</code> | The offset, in milliseconds, from market close to run the algorithm. Negative is before, positive is after. |
| f | <code>function</code> | The function to run. |

<a name="Scheduler.every"></a>

### Scheduler.every(minutes, extended, f)
Runs every 'x' minutes while the market is open.

**Kind**: static method of [<code>Scheduler</code>](#Scheduler)  

| Param | Type | Description |
| --- | --- | --- |
| minutes | <code>Number</code> |  |
| extended | <code>Boolean</code> | Whether to run during extended trading hours. |
| f | <code>function</code> | The function to run. |

<a name="Scheduler.cancel"></a>

### Scheduler.cancel(schedule)
Cancels a job.

**Kind**: static method of [<code>Scheduler</code>](#Scheduler)  

| Param | Type |
| --- | --- |
| schedule | <code>schedule</code> | 

<a name="Scheduler.getNext"></a>

### Scheduler.getNext(schedule) ⇒ <code>Date</code>
Returns the date of the next invocation of the given job.

**Kind**: static method of [<code>Scheduler</code>](#Scheduler)  

| Param | Type |
| --- | --- |
| schedule | <code>schedule</code> | 

