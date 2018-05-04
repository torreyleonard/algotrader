class LibraryError extends Error {

	constructor(message) {
		if (message.indexOf("{") === 0) {
			let json = JSON.parse(message);
			let keys = Object.keys(json);
			if (keys.length === 1) message = JSON.stringify(json[keys[0]], null, 2);
			else message = JSON.stringify(json, null, 2);
		}
		super(message + "\n\n> Please report all unexpected errors on GitHub: https://git.io/vpYYL\n");
	}

	toString() {
		let line = "\u2501".repeat(process.stdout.columns - 5);
		return line + "\n" + this.message + "\b\n" + line;
	}

}

module.exports = LibraryError;