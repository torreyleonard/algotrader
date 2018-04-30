const ftp = require('ftp');
const csv = require('fast-csv');

/**
 * For use with the Nasdaq's public data repository.
 */
class Nasdaq {

	/**
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
	 * @returns {Promise<Object[]>}
	 */
	static getListings() {
		return Nasdaq._request("SymbolDirectory/nasdaqlisted.txt");
	}

	/**
	 * Returns an array of objects with details on Nasdaq traded equities.
	 * @returns {Promise<Object[]>}
	 */
	static getTraded() {
		return Nasdaq._request("SymbolDirectory/nasdaqtraded.txt")
	}

	/**
	 * Returns an array of objects with details on other equities.
	 * @returns {Promise<Object[]>}
	 */
	static getOtherListings() {
		return Nasdaq._request("SymbolDirectory/otherlisted.txt")
	}

	/**
	 * Returns an array of objects with details on OTC traded equities.
	 * @returns {Promise<Object[]>}
	 */
	static getOTCListings() {
		return Nasdaq._request("SymbolDirectory/otclist.txt")
	}

}

module.exports = Nasdaq;