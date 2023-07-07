"use strict";
const puppeteer = require("puppeteer-core");

module.exports = {
	buildBlobFromHtml,
};

async function buildBlobFromHtml(htmlString) {
	const browser = await puppeteer.launch({
		executablePath: "/usr/bin/google-chrome-stable",
		headless: true,
		ignoreHTTPSErrors: true,
		args: ["--hide-scrollbars", "--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
	});

	const page = await browser.newPage();
	await page.setContent(htmlString);
	const pdf = await page.pdf({ format: 'Letter' });

	await browser.close();
	return pdf;
}

