"use strict";

const gisService = require('./services/gis.service');
const pdfService = require('./services/pdf-maker.service');
const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors({
	methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
	allowedHeaders: [
		'Origin',
		'Access-Control-Allow-Origin',
		'X-Requested-With',
		'Content-Type',
		'Accept',
		'Authorization',
	],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded());

app.get("/hello", async (req, res) => {
	await sendPDF(res, '<h1>Hello People!</h1>');
});

app.get("/", async (req, res) => {
	res.send('OK');
});

app.post("/", async (req, res) => {
	const body = req.body || {};
	const html = body.html;
	const title = body.title;

	await sendPDF(res, title, html);
});

app.post("/clear_cache", async (req, res) => {
	const body = req.body || {};
	const title = body.title;

	pdfService.clearCache(title);

	res.status(200);
	res.send('Cache Cleared');
});

app.get("/ca_water_districts", async (req, res) => {
	const data = await gisService.getCaliforniaWaterBoundaries().catch(() => {});
	res.send(data);
});

app.listen(process.env.PORT || 3000);

async function sendPDF(res, title, html) {
	try {
		if (!html) {
			res.status(400);
			res.send('HTML is required');

			return;
		}

		const pdf = await pdfService.buildBlobFromHtml(title, html);

		res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment; filename=download.pdf",
			"Content-Length": pdf.length,
		});

		res.end(pdf);

	} catch (error) {
		console.log('sendPDF: ', error.message || error);

		res.status(500);
		res.send(error.message);
	}
}
