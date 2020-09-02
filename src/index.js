"use strict";

const pdfService = require('./services/pdf-maker.service');
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
	sendPDF(res, '<h1>Hello People!</h1>');
});

app.post("/", async (req, res) => {
	const body = req.body || {};
	const html = body.html;
	sendPDF(res, html);
});

app.listen(process.env.PORT || 3000);


function sendPDF(res, html) {
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
