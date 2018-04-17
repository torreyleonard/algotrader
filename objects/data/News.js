const request = require('request');
const xmlJS = require('xml-js');

/**
 * Represents an individual news article. Static functions retrieve News objects.
 */
class News {

	/**
	 * Creates a new News instance.
	 * @param object
	 * @property {String} symbol
	 * @property {String} description
	 * @property {Date} date
	 * @property {String} source
	 * @property {String} author
	 * @property {String} url
	 */
	constructor(object) {
		this.title = object.title;
		this.description = object.description;
		this.date = object.date;
		this.source = object.source;
		this.author = object.author;
		this.url = object.url;
	}

	/**
	 * Returns an array of News objects for the given symbol.
	 * @param {String} symbol
	 * @returns {Promise<Array>}
	 */
	static getFromYahoo(symbol) {
		return new Promise((resolve, reject) => {
			request({
				uri: 'http://feeds.finance.yahoo.com/rss/2.0/headline?s=' + symbol + '&region=US&lang=en-US'
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new Error(body));
				else {
					const result = JSON.parse(xmlJS.xml2json(body, {compact: true, spaces: 0})).rss.channel.item;
					let array = [];
					result.forEach(o => {
						array.push(new News({
							title: o.title._text,
							description: o.description._text,
							date: new Date(o.pubDate._text),
							url: o.link._text
						}))
					});
					resolve(array);
				}
			})
		})
	}

	/**
	 * Search through millions of articles from over 30,000 large and small news sources and blogs. This includes breaking news as well as lesser articles.
	 * Returns an array of News objects for the given symbol from News API.
	 * @param {String} apiKey - Your News API key, found for free here: https://newsapi.org/register
	 * @param {Object} object - Further documentation can be found here: https://newsapi.org/docs/endpoints/everything
	 * @property {String} q - Keywords or phrases to search for.
	 * @property {String} sources - A comma-separated string of identifiers (maximum 20) for the news sources or blogs you want headlines from.
	 * @property {String} domains - A comma-separated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to restrict the search to.
	 * @property {Date} from - A date and optional time for the oldest article allowed.
	 * @property {Date} to - A date and optional time for the newest article allowed.
	 * @property {String} language - Possible options: 'ar,' 'de,' 'en,' 'es,' 'fr,' 'he,' 'it,' 'nl,' 'no,' 'pt,' 'ru,' 'se,' 'ud,' 'zh'
	 * @property {String} sortBy - Possible options: 'relevancy,' 'popularity,' 'publishedAt'
	 * @property {Number} pageSize - The number of results to return per page. 20 is the default, 100 is the maximum.
	 * @property {Number} page - Use this to page through the results.
	 */
	static getAll(apiKey, object) {
		return new Promise((resolve, reject) => {
			if (!object) reject(new Error("You must pass an object containing your query to News API functions.\nVisit https://github.com/Ladinn/algotrader for more information."));
			else {
				object.apiKey = apiKey;
				request({
					uri: 'https://newsapi.org/v2/everything',
					qs: object
				}, (error, response, body) => {
					if (error) reject(error);
					else if (response.statusCode !== 200) reject(new Error(body));
					else {
						const json = JSON.parse(body).articles;
						let array = [];
						json.forEach(o => {
							array.push(new News({
								title: o.title,
								description: o.description,
								author: o.author,
								source: o.source.name,
								url: o.url,
								date: new Date(o.publishedAt)
							}))
						});
						resolve(array);
					}
				})
			}
		})
	}

	/**
	 * This endpoint provides live top and breaking headlines for a country, specific category in a country, single source, or multiple sources. You can also search with keywords. Articles are sorted by the earliest date published first.
	 * Returns an array of News objects for the given symbol from News API.
	 * @param {String} apiKey - Your News API key, found for free here: https://newsapi.org/register
	 * @param {Object} object - Further documentation can be found here: https://newsapi.org/docs/endpoints/top-headlines
	 * @property {String} q - Keywords or phrases to search for.
	 * @property {String} category - Possible options: 'business,' 'entertainment,' 'general,' 'health,' 'science,' 'sports,' 'technology' (Cannot be mixed with sources parameter)
	 * @property {String} country - The 2-letter ISO 3166-1 code of the country you want to get headlines for. (Cannot be mixed with sources parameter)
	 * @property {String} sources - A comma-separated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. (Cannot be mixed with country parameter)
	 * @property {Number} pageSize - The number of results to return per page. 20 is the default, 100 is the maximum.
	 * @property {Number} page - Use this to page through the results.
	 */
	static getHeadlines(apiKey, object) {
		return new Promise((resolve, reject) => {
			if (!object) reject(new Error("You must pass an object containing your query to News API functions.\nVisit https://github.com/Ladinn/algotrader for more information."));
			else {
				object.apiKey = apiKey;
				request({
					uri: 'https://newsapi.org/v2/top-headlines',
					qs: object
				}, (error, response, body) => {
					if (error) reject(error);
					else if (response.statusCode !== 200) reject(new Error(body));
					else {
						const json = JSON.parse(body).articles;
						let array = [];
						json.forEach(o => {
							array.push(new News({
								title: o.title,
								description: o.description,
								author: o.author,
								source: o.source.name,
								url: o.url,
								date: new Date(o.publishedAt)
							}))
						});
						resolve(array);
					}
				})
			}
		})
	}

	// GET

	/**
	 * Using the URL provided for the news article, this will return the contents of that page.
	 * @returns {Promise<String>}
	 */
	getArticle() {
		const _this = this;
		return new Promise((resolve, reject) => {
			request({
				uri: _this.url
			}, (error, response, body) => {
				if (error) reject(error);
				else if (response.statusCode !== 200) reject(new Error(body));
				else {
					_this.article = body;
					resolve(body);
				}
			})
		})
	}

	/**
	 * @returns {String}
	 */
	getTitle() {
		return this.title;
	}

	/**
	 * @returns {String}
	 */
	getDescription() {
		return this.description;
	}

	/**
	 * @returns {Date}
	 */
	getDate() {
		return this.date;
	}

	/**
	 * @returns {String}
	 */
	getSource() {
		return this.source;
	}

	/**
	 * @returns {String}
	 */
	getAuthor() {
		return this.author;
	}

	/**
	 * @returns {String}
	 */
	getURL() {
		return this.url;
	}

}

module.exports = News;
