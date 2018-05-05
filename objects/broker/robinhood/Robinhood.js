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
			if (body.indexOf("{") === 0) {

				let json = JSON.parse(body);
				let keys = Object.keys(json);
				if (keys.length === 1) body = " | " + json[keys[0]];
				else body = ".\n\n" + JSON.stringify(json, null, 2);

			} else body = " | " + body;
			reject(new LibraryError("Robinhood responded with code " + response.statusCode + body));
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
						'Authorization': 'Token ' + token
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
					loading.succeed("Download complete with " + count + " requests.");
					resolve(array);
				});
			} else if (json.results) resolve(json.results.length === 1 ? json.results[0] : json.results);
			else resolve(json);
		}
	}

}

module.exports = Robinhood;