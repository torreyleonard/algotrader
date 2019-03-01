const ftp = require('ftp');
const csv = require('fast-csv');
const _ = require('lodash');

/**
 * For use with the Nasdaq's public data repository.
 */
class Nasdaq {

	/**
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @private
	 */
	static _request(directory) {
		return new Promise((resolve, reject) => {
			const client = new ftp();
			client.on('ready', () => {
				client.get(directory, (error, stream) => {
					if (error) reject(error);
					stream.once('close', () => { client.end(); });
					let array = [];
					csv.fromStream(stream, { headers: true, delimiter: "|" })
						.on('data', data => {
							array.push(data);
						})
						.on('end', () => {
							resolve(array);
						})
				})
			});
			client.connect({ host: "ftp.nasdaqtrader.com" });
		});
	}

	/**
	 * Returns an array of objects with details on Nasdaq listed equities.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object[]>}
	 */
	static getListings() {
		return Nasdaq._request("SymbolDirectory/nasdaqlisted.txt");
	}

	/**
	 * Returns an array of objects with details on Nasdaq traded equities.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object[]>}
	 */
	static getTraded() {
		return Nasdaq._request("SymbolDirectory/nasdaqtraded.txt");
	}

	/**
	 * Returns an array of objects with details on other equities.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object[]>}
	 */
	static getOtherListings() {
		return Nasdaq._request("SymbolDirectory/otherlisted.txt");
	}

	/**
	 * Returns an array of objects with details on OTC traded equities.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<Object[]>}
	 */
	static getOTCListings() {
		return Nasdaq._request("SymbolDirectory/otclist.txt");
	}

	/**
	 * Returns an array of objects with details on equities whose name matchs the given filter.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @param {String} string
	 * @returns {Promise<Object[]>}
	 */
	static getByName(string) {
		return Nasdaq.getTraded().then(array => {
			return (_.filter(array, o => { return o["Security Name"].indexOf(string) !== -1; }))
		})
	}

	/**
	 * Returns an array of symbols that represent exchange traded funds.
	 * @author Torrey Leonard <https://github.com/Ladinn>
	 * @returns {Promise<String[]>}
	 */
	static getETFs() {
		return Nasdaq.getTraded().then(array => {
			array = _.filter(array, o => { return o["ETF"] === "Y"; });
			return (_.map(array, 'Symbol'));
		})
	}

}

module.exports = Nasdaq;