const LibraryError = require('../../globals/LibraryError');
const async = require('async');
const request = require('request');
const ora = require('ora');

/**
 * Robinhood superclass.
 * @private
 */
class Robinhood {

	constructor() {
		this.url = "https://api.robinhood.com";
	}

	static handleResponse(error, response, body, token, resolve, reject) {
		if (error) reject(error);
		else if (response.statusCode > 299 || response.statusCode < 200) {
			try {
				if (body.indexOf("{") === 0) {
					let json = JSON.parse(body);
					body = ".\n\n" + JSON.stringify(json, null, 2);
				} else body = " | " + body;
			} catch (e) {
				body = ".\n\n" + JSON.stringify(body, null, 2);
			}
			reject(new LibraryError(`Robinhood responded with code ${response.statusCode}: ${response.statusMessage.toLowerCase()}${body}`))
		} else {
			const json = JSON.parse(body);
			if (json.next) {
				let count = 0;
				let loading = ora(`Downloading from Robinhood... (${++count})`).start();
				let array = json.results;
				let next = json.next;
				async.whilst(() => { return next !== null; }, callback => {
					let options = {
						uri: next
					};
					if (token !== null) options.headers = {
						'Authorization': 'Bearer ' + token
					};
					request(options, (error, response, body) => {
						if (error) reject(error);
						else if (response.statusCode !== 200) reject(new LibraryError(body));
						else {
							const nextJson = JSON.parse(body);
							next = nextJson.next;
							array.push(nextJson.results);
							loading.text = `Downloading from Robinhood... (${++count})`;
							callback();
						}
					})
				}, () => {
					loading.succeed("Download completed after " + count + " requests.");
					resolve(array);
				});
			} else if (json.results) resolve(json.results.length === 1 ? json.results[0] : json.results);
			else resolve(json);
		}
	}

}

module.exports = Robinhood;