
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
	const url = 'https://gis.water.ca.gov/arcgis/rest/services/Boundaries/i03_WaterDistricts/FeatureServer/0/query?where=1%3D1&outFields=AGENCYNAME&outSR=4326&f=geojson';

	return axios.get(url)
		.then(response => response.data)
		.catch(error => {
			const errorResponse = error && error.response && error.response.data;

			return Promise.reject(errorResponse || error);
		});
}
