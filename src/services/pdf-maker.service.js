"use strict";
const puppeteer = require("puppeteer");

module.exports = {
	buildBlobFromHtml,
};

async function buildBlobFromHtml(htmlString) {
	const browser = await puppeteer.launch({
		executablePath: "/usr/bin/google-chrome-stable",
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});

	const page = await browser.newPage();
	await page.setViewport({
		deviceScaleFactor: 2,
	});

	await page.setContent(htmlString);
	const pdf = await page.pdf({ format: 'Letter' });

	await browser.close();
	return pdf;
}

