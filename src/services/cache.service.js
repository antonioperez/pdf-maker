const CLEAN_UP_INTERVAL = 60 * 1000; // seconds * milliseconds

module.exports = class Cache {
	constructor() {
		this._cache = {};
		this._lastCleanUp = Date.now();
	}

	get keys() {
		return Object.keys(this._cache);
	}

	get(key) {
		const item = this._cache[key];
		if (item && Date.now() < item.expiresAt) {
			return item.value;
		}

		this.cleanUp();
		return null;
	}

	set(key, value, minutesUntilExpiration = 5) {
		const minuteInMs = 1000 * 60;
		this._cache[key] = {
			value,
			expiresAt: Date.now() + (minutesUntilExpiration * minuteInMs),
		};

		this.cleanUp();
	}

	remove(key) {
		delete this._cache[key];
	}

	cleanUp() {
		if (this._lastCleanUp + CLEAN_UP_INTERVAL < Date.now()) return;

		const keys = Object.keys(this._cache);
		for (const key of keys) {
			if (this.isExpired(key)) {
				this.remove(key);
			}
		}

		this._lastCleanUp = Date.now();
	}

	isExpired(key) {
		const item = this._cache[key];
		return item && item.expiresAt < Date.now();
	}
}
