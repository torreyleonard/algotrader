module.exports = {
	Robinhood: {
		User: require('./objects/robinhood/User'),
		Quote: require('./objects/robinhood/Quote'),
		Instrument: require('./objects/robinhood/Instrument'),
		Fundamentals: require('./objects/robinhood/Fundamentals'),
		Market: require('./objects/robinhood/Market'),
		Order: require('./objects/robinhood/Order'),
		Portfolio: require('./objects/robinhood/Portfolio')
	},
	Data: {
		OptionsChain: require('./objects/data/OptionsChain'),
		Quote: require('./objects/data/Quote'),
		Stream: require('./objects/data/Stream'),
		Query: require('./objects/data/Query')
	}
};