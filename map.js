let map;
const chicago = { lat: 36.7854513, lng: -119.9346459 };

function addGeoJson(map) {
	let infowindow = new google.maps.InfoWindow();
	geojsonlayer = new google.maps.Data();
	geojsonlayer.loadGeoJson('http://pdfgenerator-env.eba-x7cpcrdv.us-west-1.elasticbeanstalk.com/ca_water_districts');

	geojsonlayer.addListener('click', (event) => {
		const feature = event.feature || {};
		const countyInformation = feature.i || {};

		let html =
			'<b>' +
			countyInformation.COUNTY_NAME +
			'</b><br> Country Code: ' +
			countyInformation.COUNTY_CODE;

		html += '<br>County FIPS: ' + countyInformation.COUNTY_FIPS + '</br>';

		infowindow.setContent(html);
		infowindow.setPosition(event.latLng);
		infowindow.setOptions({ pixelOffset: new google.maps.Size(0, -34) });
		infowindow.open(map);
	});
}

function WaterDistrictControl(controlDiv, map) {
	let isGeojsonActive = false;
	addGeoJson(map);

	const controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginLeft = '-10px';
	controlUI.style.marginTop = '8px';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to recenter the map';
	controlDiv.appendChild(controlUI);

	const controlText = document.createElement('div');
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = 'Water Districts';
	controlUI.appendChild(controlText);

	controlUI.addEventListener('click', () => {
		if (!isGeojsonActive) {
			isGeojsonActive = true;
			geojsonlayer.setMap(map);
		} else {
			isGeojsonActive = false;
			geojsonlayer.setMap(null);
		}
	});
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: chicago,
	});

	const centerControlDiv = document.createElement('div');
	WaterDistrictControl(centerControlDiv, map);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
}
