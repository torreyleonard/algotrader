## Classes

<dl>
<dt><a href="#AlphaVantage">AlphaVantage</a></dt>
<dd><p>Further documentation can be found here: <a href="https://www.alphavantage.co/documentation/">https://www.alphavantage.co/documentation/</a></p>
</dd>
<dt><a href="#IEX">IEX</a></dt>
<dd><p>Used to interact with the IEX api. See the official documentation for more: <a href="https://iextrading.com/developer/docs/#last">https://iextrading.com/developer/docs/#last</a></p>
</dd>
<dt><a href="#Nasdaq">Nasdaq</a></dt>
<dd><p>For use with the Nasdaq&#39;s public data repository.</p>
</dd>
<dt><a href="#News">News</a></dt>
<dd><p>Represents an individual news article. Static functions retrieve News objects.</p>
</dd>
<dt><a href="#Query">Query</a></dt>
<dd><p>Find and filter securities based on certain criteria.</p>
</dd>
<dt><a href="#Stream">Stream</a></dt>
<dd></dd>
<dt><a href="#Yahoo">Yahoo</a></dt>
<dd><p>Used to interact with the Yahoo Finance API.</p>
</dd>
</dl>

<a name="AlphaVantage"></a>

## AlphaVantage
Further documentation can be found here: https://www.alphavantage.co/documentation/

**Kind**: global class  

* [AlphaVantage](#AlphaVantage)
    * [new AlphaVantage(apiKey)](#new_AlphaVantage_new)
    * [.sectorPerformance()](#AlphaVantage+sectorPerformance) ⇒ <code>Promise</code>
    * [.timeSeriesIntraday(symbol, interval)](#AlphaVantage+timeSeriesIntraday) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.timeSeriesDaily(symbol, compact, adjusted)](#AlphaVantage+timeSeriesDaily) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.timeSeriesWeekly(symbol, adjusted)](#AlphaVantage+timeSeriesWeekly) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.timeSeriesMonthly(symbol, adjusted)](#AlphaVantage+timeSeriesMonthly) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.sma(symbol, interval, timePeriod, seriesType, seriesType, seriesType)](#AlphaVantage+sma) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.ema(symbol, interval, timePeriod, seriesType)](#AlphaVantage+ema) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.wma(symbol, interval, timePeriod, seriesType)](#AlphaVantage+wma) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.dema(symbol, interval, timePeriod, seriesType)](#AlphaVantage+dema) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.dema(symbol, interval, timePeriod, seriesType)](#AlphaVantage+dema) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.tema(symbol, interval, timePeriod, seriesType)](#AlphaVantage+tema) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.trima(symbol, interval, timePeriod, seriesType)](#AlphaVantage+trima) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.kama(symbol, interval, timePeriod, seriesType)](#AlphaVantage+kama) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.mama(symbol, interval, timePeriod, seriesType, fastLimit, slowLimit)](#AlphaVantage+mama) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.t3(symbol, interval, timePeriod, seriesType)](#AlphaVantage+t3) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.macd(symbol, interval, timePeriod, seriesType, fastPeriod, slowPeriod, signalPeriod)](#AlphaVantage+macd) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.macd(symbol, interval, timePeriod, seriesType, fastPeriod, slowPeriod, signalPeriod, fastMaType, slowMaType, signalMaType)](#AlphaVantage+macd) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.stoch(symbol, interval, timePeriod, seriesType, fastKPeriod, slowKPeriod, slowDPeriod, slowKmaType, slowDmaType)](#AlphaVantage+stoch) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.stochf(symbol, interval, timePeriod, seriesType, fastKPeriod, fastDPeriod, fastDmaType)](#AlphaVantage+stochf) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.rsi(symbol, interval, timePeriod, seriesType)](#AlphaVantage+rsi) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.stochRSI(symbol, interval, timePeriod, seriesType, fastKPeriod, fastDPeriod, fastDmaType)](#AlphaVantage+stochRSI) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.bbands(symbol, interval, timePeriod, seriesType, nbdevup, nbdevdn, matype)](#AlphaVantage+bbands) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.minus_di(symbol, interval, timePeriod)](#AlphaVantage+minus_di) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.plus_di(symbol, interval, timePeriod)](#AlphaVantage+plus_di) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.adx(symbol, interval, timePeriod)](#AlphaVantage+adx) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="new_AlphaVantage_new"></a>

### new AlphaVantage(apiKey)
Creates a new AlphaVantage instance.


| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>String</code> | The free API key retrieved from |

<a name="AlphaVantage+sectorPerformance"></a>

### alphaVantage.sectorPerformance() ⇒ <code>Promise</code>
Returns an array of objects showing historical and real time S&P sector performance.

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  
<a name="AlphaVantage+timeSeriesIntraday"></a>

### alphaVantage.timeSeriesIntraday(symbol, interval) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for the equity specified, updated in real time.

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | How long each quote should represent: 1min, 5min, 15min, 30min, 60min |

<a name="AlphaVantage+timeSeriesDaily"></a>

### alphaVantage.timeSeriesDaily(symbol, compact, adjusted) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for the equity specified, covering up to 20 years of historical data.

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| compact | <code>Boolean</code> | If true, this will return the last 100 data points. If false, it will return up to 20 years of historical data. |
| adjusted | <code>Boolean</code> | If true, prices will be adjusted for split/dividend events. |

<a name="AlphaVantage+timeSeriesWeekly"></a>

### alphaVantage.timeSeriesWeekly(symbol, adjusted) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for the equity specified, covering up to 20 years of historical data.

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| adjusted | <code>Boolean</code> | If true, prices will be adjusted for split/dividend events. |

<a name="AlphaVantage+timeSeriesMonthly"></a>

### alphaVantage.timeSeriesMonthly(symbol, adjusted) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for the equity specified, covering up to 20 years of historical data.

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| adjusted | <code>Boolean</code> | If true, prices will be adjusted for split/dividend events. |

<a name="AlphaVantage+sma"></a>

### alphaVantage.sma(symbol, interval, timePeriod, seriesType, seriesType, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of simple moving averages for the equity specified.
https://www.investopedia.com/articles/technical/052201.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+ema"></a>

### alphaVantage.ema(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of exponential moving averages for the equity specified.
https://www.investopedia.com/terms/e/ema.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+wma"></a>

### alphaVantage.wma(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of weighted moving averages for the equity specified.
https://www.investopedia.com/articles/technical/060401.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+dema"></a>

### alphaVantage.dema(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of double exponential moving averages for the equity specified.
http://www.investopedia.com/articles/trading/10/double-exponential-moving-average.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+dema"></a>

### alphaVantage.dema(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of double exponential moving averages for the equity specified.
http://www.investopedia.com/articles/trading/10/double-exponential-moving-average.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+tema"></a>

### alphaVantage.tema(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of triple exponential moving averages for the equity specified.
https://www.investopedia.com/terms/t/triple-exponential-moving-average.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+trima"></a>

### alphaVantage.trima(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of triangular moving averages for the equity specified.
http://www.fmlabs.com/reference/default.htm?url=TriangularMA.htm

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+kama"></a>

### alphaVantage.kama(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of Kaufman adaptive moving averages for the equity specified.
http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:kaufman_s_adaptive_moving_average

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+mama"></a>

### alphaVantage.mama(symbol, interval, timePeriod, seriesType, fastLimit, slowLimit) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of MESA adaptive moving averages for the equity specified.
http://www.binarytribune.com/forex-trading-indicators/ehlers-mesa-adaptive-moving-average

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |
| fastLimit | <code>Number</code> |  |
| slowLimit | <code>Number</code> |  |

<a name="AlphaVantage+t3"></a>

### alphaVantage.t3(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of T3 values for the equity specified.
http://www.fmlabs.com/reference/default.htm?url=T3.htm

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+macd"></a>

### alphaVantage.macd(symbol, interval, timePeriod, seriesType, fastPeriod, slowPeriod, signalPeriod) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of moving average convergence / divergence values for the equity specified.
http://www.investopedia.com/articles/forex/05/macddiverge.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |
| fastPeriod | <code>Number</code> \| <code>Null</code> |  |
| slowPeriod | <code>Number</code> \| <code>Null</code> |  |
| signalPeriod | <code>Number</code> \| <code>Null</code> |  |

<a name="AlphaVantage+macd"></a>

### alphaVantage.macd(symbol, interval, timePeriod, seriesType, fastPeriod, slowPeriod, signalPeriod, fastMaType, slowMaType, signalMaType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of moving average convergence / divergence values with controllable moving average type for the equity specified.
http://www.investopedia.com/articles/forex/05/macddiverge.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |
| fastPeriod | <code>Number</code> \| <code>Null</code> |  |
| slowPeriod | <code>Number</code> \| <code>Null</code> |  |
| signalPeriod | <code>Number</code> \| <code>Null</code> |  |
| fastMaType | <code>Number</code> \| <code>Null</code> | Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA). |
| slowMaType | <code>Number</code> \| <code>Null</code> | Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA). |
| signalMaType | <code>Number</code> \| <code>Null</code> | Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA). |

<a name="AlphaVantage+stoch"></a>

### alphaVantage.stoch(symbol, interval, timePeriod, seriesType, fastKPeriod, slowKPeriod, slowDPeriod, slowKmaType, slowDmaType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of stochastic oscillators for the equity specified.
http://www.investopedia.com/university/indicator_oscillator/ind_osc8.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |
| fastKPeriod | <code>Number</code> \| <code>Null</code> |  |
| slowKPeriod | <code>Number</code> \| <code>Null</code> |  |
| slowDPeriod | <code>Number</code> \| <code>Null</code> |  |
| slowKmaType | <code>Number</code> \| <code>Null</code> | Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA). |
| slowDmaType | <code>Number</code> \| <code>Null</code> | Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA). |

<a name="AlphaVantage+stochf"></a>

### alphaVantage.stochf(symbol, interval, timePeriod, seriesType, fastKPeriod, fastDPeriod, fastDmaType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of stochastic fast oscillators for the equity specified.
http://www.investopedia.com/university/indicator_oscillator/ind_osc8.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |
| fastKPeriod | <code>Number</code> \| <code>Null</code> |  |
| fastDPeriod | <code>Number</code> \| <code>Null</code> |  |
| fastDmaType | <code>Number</code> \| <code>Null</code> | Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA). |

<a name="AlphaVantage+rsi"></a>

### alphaVantage.rsi(symbol, interval, timePeriod, seriesType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of relative strength index values for the equity specified.
http://www.investopedia.com/articles/technical/071601.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |

<a name="AlphaVantage+stochRSI"></a>

### alphaVantage.stochRSI(symbol, interval, timePeriod, seriesType, fastKPeriod, fastDPeriod, fastDmaType) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of stochastic relative strength index values for the equity specified.
http://www.fmlabs.com/reference/default.htm?url=StochRSI.htm

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |
| seriesType | <code>String</code> | What to base the SMA on: open, high, low, close |
| fastKPeriod | <code>Number</code> \| <code>Null</code> |  |
| fastDPeriod | <code>Number</code> \| <code>Null</code> |  |
| fastDmaType | <code>Number</code> \| <code>Null</code> | Integers 0 - 8 are accepted with the following mappings: 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA). |

<a name="AlphaVantage+bbands"></a>

### alphaVantage.bbands(symbol, interval, timePeriod, seriesType, nbdevup, nbdevdn, matype) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of bollinger bands for the equity specified.
https://www.investopedia.com/articles/technical/04/030304.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time interval between two consecutive data points in the time series. The following values are supported: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each BBANDS value. Positive integers are accepted (e.g., time_period=60, time_period=200) |
| seriesType | <code>String</code> | The desired price type in the time series. Four types are supported: close, open, high, low |
| nbdevup | <code>Number</code> \| <code>Null</code> | The standard deviation multiplier of the upper band. Positive integers are accepted. By default, nbdevup=2. |
| nbdevdn | <code>Number</code> \| <code>Null</code> | The standard deviation multiplier of the lower band. Positive integers are accepted. By default, nbdevdn=2. |
| matype | <code>Number</code> \| <code>Null</code> | Moving average type of the time series. By default, matype=0. Integers 0 - 8 are accepted with the following mappings. 0 = Simple Moving Average (SMA), 1 = Exponential Moving Average (EMA), 2 = Weighted Moving Average (WMA), 3 = Double Exponential Moving Average (DEMA), 4 = Triple Exponential Moving Average (TEMA), 5 = Triangular Moving Average (TRIMA), 6 = T3 Moving Average, 7 = Kaufman Adaptive Moving Average (KAMA), 8 = MESA Adaptive Moving Average (MAMA). |

<a name="AlphaVantage+minus_di"></a>

### alphaVantage.minus\_di(symbol, interval, timePeriod) ⇒ <code>Promise.&lt;Array&gt;</code>
This API returns the minus directional indicator (MINUS_DI) values
http://www.investopedia.com/articles/technical/02/050602.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |

<a name="AlphaVantage+plus_di"></a>

### alphaVantage.plus\_di(symbol, interval, timePeriod) ⇒ <code>Promise.&lt;Array&gt;</code>
This API returns the plus directional indicator (PLUS_DI) values
http://www.investopedia.com/articles/technical/02/050602.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each moving average value. Positive integers are accepted. |

<a name="AlphaVantage+adx"></a>

### alphaVantage.adx(symbol, interval, timePeriod) ⇒ <code>Promise.&lt;Array&gt;</code>
This API returns the average directional movement index (ADX) values
http://www.investopedia.com/articles/trading/07/adx-trend-indicator.asp

**Kind**: instance method of [<code>AlphaVantage</code>](#AlphaVantage)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| interval | <code>String</code> | Time between two data points in the series: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly |
| timePeriod | <code>Number</code> | Number of data points used to calculate each ADX value. Positive integers are accepted |

<a name="IEX"></a>

## IEX
Used to interact with the IEX api. See the official documentation for more: https://iextrading.com/developer/docs/#last

**Kind**: global class  

* [IEX](#IEX)
    * [.getMarket()](#IEX.getMarket) ⇒ <code>Promise.&lt;Market&gt;</code>
    * [.getQuote(symbol)](#IEX.getQuote) ⇒ <code>Promise.&lt;Quote&gt;</code>
    * [.getBatchQuotes(symbolArray)](#IEX.getBatchQuotes) ⇒ <code>Promise.&lt;Array.&lt;Quote&gt;&gt;</code>
    * [.getCompanyDetails(symbol)](#IEX.getCompanyDetails) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getDividends(symbol)](#IEX.getDividends) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getEarnings(symbol)](#IEX.getEarnings) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getFinancials(symbol)](#IEX.getFinancials) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getStats(symbol)](#IEX.getStats) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getLogo(symbol)](#IEX.getLogo) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.getNews(symbol)](#IEX.getNews) ⇒ <code>Promise.&lt;Array.&lt;News&gt;&gt;</code>
    * [.getPeers(symbol)](#IEX.getPeers) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
    * [.getSplits(symbol)](#IEX.getSplits) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getVolumeByVenue(symbol)](#IEX.getVolumeByVenue) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
    * [.getAllSymbols()](#IEX.getAllSymbols) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

<a name="IEX.getMarket"></a>

### IEX.getMarket() ⇒ <code>Promise.&lt;Market&gt;</code>
Returns a market object.

**Kind**: static method of [<code>IEX</code>](#IEX)  
<a name="IEX.getQuote"></a>

### IEX.getQuote(symbol) ⇒ <code>Promise.&lt;Quote&gt;</code>
Returns a quote object for the given symbol.

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getBatchQuotes"></a>

### IEX.getBatchQuotes(symbolArray) ⇒ <code>Promise.&lt;Array.&lt;Quote&gt;&gt;</code>
Returns an array of quote objects for the given symbols.

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type | Description |
| --- | --- | --- |
| symbolArray | <code>Array.&lt;String&gt;</code> | An array of symbols to query |

<a name="IEX.getCompanyDetails"></a>

### IEX.getCompanyDetails(symbol) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing data on the given company.
https://iextrading.com/developer/docs/#company

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getDividends"></a>

### IEX.getDividends(symbol) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing data on dividends issued by the given company.
https://iextrading.com/developer/docs/#dividends

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getEarnings"></a>

### IEX.getEarnings(symbol) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing data on the four most recent earnings reports by the given company.
https://iextrading.com/developer/docs/#earnings

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getFinancials"></a>

### IEX.getFinancials(symbol) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing data on the given company's income statement, balance sheet, and cash flow from the four most recent reported quarters.
https://iextrading.com/developer/docs/#financials

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getStats"></a>

### IEX.getStats(symbol) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing data on the given company's market cap, beta, 52-week high & low, change, short intereste, dividend rate, float, EBITDA, cash, and more.
https://iextrading.com/developer/docs/#key-stats

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getLogo"></a>

### IEX.getLogo(symbol) ⇒ <code>Promise.&lt;String&gt;</code>
Returns a string containing a URL endpoint with the given company's logo.
https://iextrading.com/developer/docs/#logo

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getNews"></a>

### IEX.getNews(symbol) ⇒ <code>Promise.&lt;Array.&lt;News&gt;&gt;</code>
Returns an array of news objects for the given symbol.
https://iextrading.com/developer/docs/#logo

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getPeers"></a>

### IEX.getPeers(symbol) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Returns an array of peer tickers as defined by IEX.
https://iextrading.com/developer/docs/#peers

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getSplits"></a>

### IEX.getSplits(symbol) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing data on stock splits issued by the given company.
https://iextrading.com/developer/docs/#dividends

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getVolumeByVenue"></a>

### IEX.getVolumeByVenue(symbol) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
This returns 15 minute delayed and 30 day average consolidated volume percentage of a stock, by market.
This call will always return 13 values, and will be sorted in ascending order by current day trading volume percentage.
https://iextrading.com/developer/docs/#volume-by-venue

**Kind**: static method of [<code>IEX</code>](#IEX)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="IEX.getAllSymbols"></a>

### IEX.getAllSymbols() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Returns an array of symbols IEX supports for trading.
https://iextrading.com/developer/docs/#symbols

**Kind**: static method of [<code>IEX</code>](#IEX)  
<a name="Nasdaq"></a>

## Nasdaq
For use with the Nasdaq's public data repository.

**Kind**: global class  

* [Nasdaq](#Nasdaq)
    * [.getListings()](#Nasdaq.getListings) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getTraded()](#Nasdaq.getTraded) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getOtherListings()](#Nasdaq.getOtherListings) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getOTCListings()](#Nasdaq.getOTCListings) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getByName(string)](#Nasdaq.getByName) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getETFs()](#Nasdaq.getETFs) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>

<a name="Nasdaq.getListings"></a>

### Nasdaq.getListings() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Returns an array of objects with details on Nasdaq listed equities.

**Kind**: static method of [<code>Nasdaq</code>](#Nasdaq)  
<a name="Nasdaq.getTraded"></a>

### Nasdaq.getTraded() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Returns an array of objects with details on Nasdaq traded equities.

**Kind**: static method of [<code>Nasdaq</code>](#Nasdaq)  
<a name="Nasdaq.getOtherListings"></a>

### Nasdaq.getOtherListings() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Returns an array of objects with details on other equities.

**Kind**: static method of [<code>Nasdaq</code>](#Nasdaq)  
<a name="Nasdaq.getOTCListings"></a>

### Nasdaq.getOTCListings() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Returns an array of objects with details on OTC traded equities.

**Kind**: static method of [<code>Nasdaq</code>](#Nasdaq)  
<a name="Nasdaq.getByName"></a>

### Nasdaq.getByName(string) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Returns an array of objects with details on equities whose name matchs the given filter.

**Kind**: static method of [<code>Nasdaq</code>](#Nasdaq)  

| Param | Type |
| --- | --- |
| string | <code>String</code> | 

<a name="Nasdaq.getETFs"></a>

### Nasdaq.getETFs() ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Returns an array of symbols that represent exchange traded funds.

**Kind**: static method of [<code>Nasdaq</code>](#Nasdaq)  
<a name="News"></a>

## News
Represents an individual news article. Static functions retrieve News objects.

**Kind**: global class  

* [News](#News)
    * [new News(object)](#new_News_new)
    * _instance_
        * [.getArticle()](#News+getArticle) ⇒ <code>Promise.&lt;String&gt;</code>
        * [.getTitle()](#News+getTitle) ⇒ <code>String</code>
        * [.getDescription()](#News+getDescription) ⇒ <code>String</code>
        * [.getDate()](#News+getDate) ⇒ <code>Date</code>
        * [.getSource()](#News+getSource) ⇒ <code>String</code>
        * [.getAuthor()](#News+getAuthor) ⇒ <code>String</code>
        * [.getURL()](#News+getURL) ⇒ <code>String</code>
    * _static_
        * [.getFromYahoo(symbol)](#News.getFromYahoo) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [.getAll(apiKey, object)](#News.getAll)
        * [.getHeadlines(apiKey, object)](#News.getHeadlines)

<a name="new_News_new"></a>

### new News(object)
Creates a new News instance.


| Param |
| --- |
| object | 

<a name="News+getArticle"></a>

### news.getArticle() ⇒ <code>Promise.&lt;String&gt;</code>
Using the URL provided for the news article, this will return the contents of that page.

**Kind**: instance method of [<code>News</code>](#News)  
<a name="News+getTitle"></a>

### news.getTitle() ⇒ <code>String</code>
**Kind**: instance method of [<code>News</code>](#News)  
<a name="News+getDescription"></a>

### news.getDescription() ⇒ <code>String</code>
**Kind**: instance method of [<code>News</code>](#News)  
<a name="News+getDate"></a>

### news.getDate() ⇒ <code>Date</code>
**Kind**: instance method of [<code>News</code>](#News)  
<a name="News+getSource"></a>

### news.getSource() ⇒ <code>String</code>
**Kind**: instance method of [<code>News</code>](#News)  
<a name="News+getAuthor"></a>

### news.getAuthor() ⇒ <code>String</code>
**Kind**: instance method of [<code>News</code>](#News)  
<a name="News+getURL"></a>

### news.getURL() ⇒ <code>String</code>
**Kind**: instance method of [<code>News</code>](#News)  
<a name="News.getFromYahoo"></a>

### News.getFromYahoo(symbol) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of News objects for the given symbol.

**Kind**: static method of [<code>News</code>](#News)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="News.getAll"></a>

### News.getAll(apiKey, object)
Search through millions of articles from over 30,000 large and small news sources and blogs. This includes breaking news as well as lesser articles.
Returns an array of News objects for the given symbol from News API.

**Kind**: static method of [<code>News</code>](#News)  

| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>String</code> | Your News API key, found for free here: https://newsapi.org/register |
| object | <code>Object</code> | Further documentation can be found here: https://newsapi.org/docs/endpoints/everything |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| q | <code>String</code> | Keywords or phrases to search for. |
| sources | <code>String</code> | A comma-separated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. |
| domains | <code>String</code> | A comma-separated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to restrict the search to. |
| from | <code>Date</code> | A date and optional time for the oldest article allowed. |
| to | <code>Date</code> | A date and optional time for the newest article allowed. |
| language | <code>String</code> | Possible options: 'ar,' 'de,' 'en,' 'es,' 'fr,' 'he,' 'it,' 'nl,' 'no,' 'pt,' 'ru,' 'se,' 'ud,' 'zh' |
| sortBy | <code>String</code> | Possible options: 'relevancy,' 'popularity,' 'publishedAt' |
| pageSize | <code>Number</code> | The number of results to return per page. 20 is the default, 100 is the maximum. |
| page | <code>Number</code> | Use this to page through the results. |

<a name="News.getHeadlines"></a>

### News.getHeadlines(apiKey, object)
This endpoint provides live top and breaking headlines for a country, specific category in a country, single source, or multiple sources. You can also search with keywords. Articles are sorted by the earliest date published first.
Returns an array of News objects for the given symbol from News API.

**Kind**: static method of [<code>News</code>](#News)  

| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>String</code> | Your News API key, found for free here: https://newsapi.org/register |
| object | <code>Object</code> | Further documentation can be found here: https://newsapi.org/docs/endpoints/top-headlines |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| q | <code>String</code> | Keywords or phrases to search for. |
| category | <code>String</code> | Possible options: 'business,' 'entertainment,' 'general,' 'health,' 'science,' 'sports,' 'technology' (Cannot be mixed with sources parameter) |
| country | <code>String</code> | The 2-letter ISO 3166-1 code of the country you want to get headlines for. (Cannot be mixed with sources parameter) |
| sources | <code>String</code> | A comma-separated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. (Cannot be mixed with country parameter) |
| pageSize | <code>Number</code> | The number of results to return per page. 20 is the default, 100 is the maximum. |
| page | <code>Number</code> | Use this to page through the results. |

<a name="Query"></a>

## Query
Find and filter securities based on certain criteria.

**Kind**: global class  

* [Query](#Query)
    * [.search(string)](#Query.search) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getTopGainers(count)](#Query.getTopGainers) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getTopLosers(count)](#Query.getTopLosers) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getHighestVolume(count)](#Query.getHighestVolume) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getHighestOpenInterest(count)](#Query.getHighestOpenInterest) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getTopETFs(count)](#Query.getTopETFs) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getSimilar(symbol)](#Query.getSimilar) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getTrendingSymbols(count)](#Query.getTrendingSymbols) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getEarnings(days)](#Query.getEarnings) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getEarningsBySymbol(symbol)](#Query.getEarningsBySymbol) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="Query.search"></a>

### Query.search(string) ⇒ <code>Promise.&lt;Array&gt;</code>
Searches for a given symbol based on the given string.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | Search query. |

<a name="Query.getTopGainers"></a>

### Query.getTopGainers(count) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for the best performing 'x' amount of stocks.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| count | <code>Number</code> | 

<a name="Query.getTopLosers"></a>

### Query.getTopLosers(count) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for the worst performing 'x' amount of stocks.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| count | <code>Number</code> | 

<a name="Query.getHighestVolume"></a>

### Query.getHighestVolume(count) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for 'x' amount of stocks with the highest volume today.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| count | <code>Number</code> | 

<a name="Query.getHighestOpenInterest"></a>

### Query.getHighestOpenInterest(count) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for options with the highest open interest.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| count | <code>Number</code> | 

<a name="Query.getTopETFs"></a>

### Query.getTopETFs(count) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of quotes for the most actively traded ETFs.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| count | <code>Number</code> | 

<a name="Query.getSimilar"></a>

### Query.getSimilar(symbol) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of equities similar to the one given.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Query.getTrendingSymbols"></a>

### Query.getTrendingSymbols(count) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of 'x' amount of trending symbols on Yahoo Finance.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| count | <code>Number</code> | 

<a name="Query.getEarnings"></a>

### Query.getEarnings(days) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of objects with information on companies that are reporting earnings within 'x' number of days, along with estimates and call URLs.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| days | <code>Number</code> | 

<a name="Query.getEarningsBySymbol"></a>

### Query.getEarningsBySymbol(symbol) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing this company's past and future earnings data.

**Kind**: static method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

<a name="Stream"></a>

## Stream
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| iex | <code>Boolean</code> | Whether to include real time IEX data in stream |
| iexType | <code>String</code> | Which endpoint to use for IEX stream (tops, last, hist, deep, book, etc. See: https://iextrading.com/developer/docs/#iex-market-data) |
| news | <code>Boolean</code> | Whether to include news headlines in the stream. |
| allHeadlines | <code>Boolean</code> | If true, all U.S. business headlines will be sent in the stream. If false, only news pertaining to the given symbols will be outputted. |
| newsApiKey | <code>String</code> | If 'includeNews' is yes, this should be your API key from https://newsapi.org/register. |


* [Stream](#Stream)
    * [new Stream(symbols, options)](#new_Stream_new)
    * [.start()](#Stream+start)
    * [.stop()](#Stream+stop)
    * ["iex"](#Stream+event_iex)

<a name="new_Stream_new"></a>

### new Stream(symbols, options)
Creates a new Stream class.


| Param | Type |
| --- | --- |
| symbols | <code>Array</code> | 
| options | <code>Object</code> \| <code>Null</code> | 

<a name="Stream+start"></a>

### stream.start()
Start the streaming class.

**Kind**: instance method of [<code>Stream</code>](#Stream)  
<a name="Stream+stop"></a>

### stream.stop()
Stop the streaming class.

**Kind**: instance method of [<code>Stream</code>](#Stream)  
<a name="Stream+event_iex"></a>

### "iex"
An extension of the Node.js EventEmitter that sends Quote and News objects as they arrive.

**Kind**: event emitted by [<code>Stream</code>](#Stream)  
<a name="Yahoo"></a>

## Yahoo
Used to interact with the Yahoo Finance API.

**Kind**: global class  

* [Yahoo](#Yahoo)
    * [.getQuotes(symbol, range, interval, extended)](#Yahoo.getQuotes) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getOptionsChain(symbol)](#Yahoo.getOptionsChain) ⇒ <code>Promise.&lt;OptionsChain&gt;</code>

<a name="Yahoo.getQuotes"></a>

### Yahoo.getQuotes(symbol, range, interval, extended) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns an array of Quote objects from Yahoo Finance.

**Kind**: static method of [<code>Yahoo</code>](#Yahoo)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> |  |
| range | <code>String</code> | How far back to retrieve data: [1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max] |
| interval | <code>String</code> | How long each quote should represent: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo] |
| extended | <code>Boolean</code> | Whether to include data from extended trading hours. |

<a name="Yahoo.getOptionsChain"></a>

### Yahoo.getOptionsChain(symbol) ⇒ <code>Promise.&lt;OptionsChain&gt;</code>
Returns a new OptionsChain object with data from Yahoo Finance.

**Kind**: static method of [<code>Yahoo</code>](#Yahoo)  

| Param | Type |
| --- | --- |
| symbol | <code>String</code> | 

