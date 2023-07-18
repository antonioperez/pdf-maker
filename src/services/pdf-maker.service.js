"use strict";
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

module.exports = {
	buildBlobFromHtml,
};

async function buildBlobFromHtml(htmlString) {
	// const browser = await puppeteer.launch({
	// 	executablePath: "/usr/bin/google-chrome-stable",
	// 	headless: true,
	// 	ignoreHTTPSErrors: true,
	// 	args: ["--hide-scrollbars", "--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
	// });

	const browser = await puppeteer.launch({
		executablePath: await chromium.executablePath(),
		headless: chromium.headless,
		ignoreHTTPSErrors: true,
		defaultViewport: chromium.defaultViewport,
		args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
	  });

	const page = await browser.newPage();
	await page.setContent(htmlString, { waitUntil: 'networkidle0' });
	//await page.goto('data:text/html,' + htmlString, { waitUntil: 'networkidle0' });

	const pdf = await page.pdf({ format: 'Letter' });

	await browser.close();
	return pdf;
}

