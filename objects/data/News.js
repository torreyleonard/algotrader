const request = require('request');
const xmlJS = require('xml-js');

class News {

	constructor(symbol) {
		this.symbol = symbol;
	}

	/**
	 * Returns an array containing news for the given symbol.
	 * @param {String} symbol
	 * @returns {Promise<Array>}
	 */
	getFromYahoo() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: 'http://feeds.finance.yahoo.com/rss/2.0/headline?s=' + _this.symbol + '&region=US&lang=en-US'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new Error(body));
				else try {
						const result = JSON.parse(xmlJS.xml2json(body, {compact: true, spaces: 0})).rss.channel.item;
						let array = [];
						result.forEach(o => {
							array.push({
								title: o.title._text,
								description: o.description._text,
								date: new Date(o.pubDate._text),
								link: o.link._text
							});
						});
						resolve(array);
					} catch (error) {
						reject(error);
					}
			})
		})
	}

}

