"use strict";
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

module.exports = {
	buildBlobFromHtml,
};

async function buildBlobFromHtml(htmlString) {
	const browser = await puppeteer.launch({
		executablePath: await chromium.executablePath(),
		headless: true,
		ignoreHTTPSErrors: true,
		defaultViewport: chromium.defaultViewport,
		args: [...chromium.args, "--hide-scrollbars", "--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
	});

	const page = await browser.newPage();
	await page.setContent(htmlString);
	const pdf = await page.pdf({ format: 'Letter' });

	await browser.close();
	return pdf;
}

