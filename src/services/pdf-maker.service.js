"use strict";
const chromium = require('chrome-aws-lambda');

module.exports = {
	buildBlobFromHtml,
};

async function buildBlobFromHtml(htmlString) {
	const browser = await chromium.puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"].concat(chromium.args),
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath,
		headless: true,
		ignoreHTTPSErrors: true,
	  });

	const page = await browser.newPage();
	await page.setContent(htmlString);
	const pdf = await page.pdf({ format: 'Letter' });

	await browser.close();
	return pdf;
}

