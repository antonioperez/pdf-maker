"use strict";

const gisService = require('./services/gis.service');
const pdfService = require('./services/pdf-maker.service');
const express = require("express");
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded());

app.get("/", async (req, res) => {
	await sendPDF(res, '<h1>Hello People!</h1>');
});

app.post("/", async (req, res) => {
	const body = req.body || {};
	const html = body.html;
	await sendPDF(res, html);
});

app.get("/ca_water_districts", async (req, res) => {
	const data = await gisService.getCaliforniaWaterBoundaries().catch(() => {});
	res.send(data);
});

app.listen(process.env.PORT || 3000);


async function sendPDF(res, html) {
	try {
		const pdf = await pdfService.buildBlobFromHtml(html);
		res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment; filename=download.pdf",
			"Content-Length": pdf.length,
		});

		res.end(pdf);

	} catch (error) {
		res.status(400)
		res.send(error.message);

		console.log(error);
	}
}
