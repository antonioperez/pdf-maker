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
		headless: true,
		ignoreHTTPSErrors: true,
		defaultViewport: chromium.defaultViewport,
		args: ["--hide-scrollbars", "--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox", '--font-render-hinting=none'],
	  });

	const page = await browser.newPage();
	await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36");
	await page.setContent(htmlString, { waitUntil: 'networkidle0' });
	//await page.goto('data:text/html,' + htmlString, { waitUntil: 'networkidle0' });

	const pdf = await page.pdf({ format: 'Letter' });

	await browser.close();
	return pdf;
}

