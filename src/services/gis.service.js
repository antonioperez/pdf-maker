
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

	const caWaterData = await getCaliforniaWaterBoundariesData().catch(() => {});

	if (caWaterData) {
		const monthInMinutes = 43800;
		waterCache.set(cacheKey, caWaterData, monthInMinutes);

		return Promise.resolve(caWaterData);
	}
}

function getCaliforniaWaterBoundariesData(){
	const url = 'https://opendata.arcgis.com/datasets/8713ced9b78a4abb97dc130a691a8695_0.geojson';

	return axios.get(url)
		.then(response => response.data)
		.catch(error => {
			const errorResponse = error && error.response && error.response.data;

			return Promise.reject(errorResponse || error);
		});
}
