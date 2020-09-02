"use strict";

const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

async function getPDF(url) {
	const browser = await puppeteer.launch({
		executablePath: "/usr/bin/google-chrome-stable",
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});

	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle0" });
	const pdf = await page.pdf(); //{ format: 'A4' }

	await browser.close();
	return pdf;
}

app.get("/", async (req, res) => {
	try {
		const pdf = await getPDF("https://schuil.com/wp-content/themes/realhomes-child/dompdf/property-test.php");

		res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment; filename=download.pdf",
			"Content-Length": pdf.length,
		});
		res.end(pdf);

	} catch (error) {
		res.send("error!");
		console.log(error);
	}
});

app.listen(process.env.PORT || 3000);
