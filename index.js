module.exports = {
	Robinhood: {
		User: require('./objects/broker/robinhood/User'),
		Instrument: require('./objects/broker/robinhood/Instrument'),
		Fundamentals: require('./objects/broker/robinhood/Fundamentals'),
		Market: require('./objects/broker/robinhood/Market'),
		Order: require('./objects/broker/robinhood/Order'),
		Portfolio: require('./objects/broker/robinhood/Portfolio'),
		OptionOrder: require('./objects/broker/robinhood/OptionOrder'),
		OptionInstrument: require('./objects/broker/robinhood/OptionInstrument')
	},
	Data: {
		Stream: require('./objects/data/Stream'),
		Query: require('./objects/data/Query'),
		AlphaVantage: require('./objects/data/AlphaVantage'),
		News: require('./objects/data/News'),
		Yahoo: require('./objects/data/Yahoo')
	},
	Algorithm: {
		Scheduler: require('./objects/algorithm/Scheduler')
	},
	Globals: {
		Quote: require('./objects/globals/Quote'),
		OptionChain: require('./objects/globals/OptionsChain')
	}
};