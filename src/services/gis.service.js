
const axios = require("axios");
const cacheService = require("./cache.service");

module.exports = {
	getCaliforniaWaterBoundaries,
};

const cacheKey = 'californiaWaterBoundaries';
const waterCache = new cacheService();
async function getCaliforniaWaterBoundaries() {
	const cachedWaterData = waterCache.get(cacheKey);
	if (cachedWaterData) {
		return Promise.resolve(cachedWaterData);
	}

	const caWaterData = getCaliforniaWaterBoundariesData();

	if (caWaterData) {
		const monthInMinutes = 43800;
		waterCache.set(cacheKey, caWaterData, monthInMinutes);

		return Promise.resolve(caWaterData);
	}
}

function getCaliforniaWaterBoundariesData(){
	return require('./ca-water-districts.json');
}
