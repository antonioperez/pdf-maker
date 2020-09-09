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
	// await page.setViewport({
	// 	width: 0, height: 0,
	// 	deviceScaleFactor: 2,
	// });

	const viewPort = page.viewport();
	console.log('Width  :', viewPort.width);
  console.log('Height :', viewPort.height);
	await page.setContent(htmlString);
	const pdf = await page.pdf({ format: 'Letter' });

	await browser.close();
	return pdf;
}

