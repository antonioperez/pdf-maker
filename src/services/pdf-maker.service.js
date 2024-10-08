"use strict";
const puppeteer = require("puppeteer");
// const chromium = require("@sparticuz/chromium");
const cacheService = require("./cache.service");

module.exports = {
	buildBlobFromHtml,
	clearCache,
};

const pdfCache = new cacheService();
let browser;

const puppeteerLaunch = async () => {
	const args = [
		"--no-sandbox",
		"--disable-dev-shm-usage",
		"--disable-accelerated-2d-canvas",
		"--no-first-run",
		"--no-zygote",
		"--noerrdialogs",
		"--disable-gpu",
		"--hide-scrollbars",
		"--disable-web-security",
		"--font-render-hinting=none",
	];

	// chromium.setHeadlessMode = true;

	// // Optional: If you'd like to disable webgl, true is the default.
	// chromium.setGraphicsMode = false;

	browser = await puppeteer.launch({
		//executablePath: await chromium.executablePath(),
		//defaultViewport: chromium.defaultViewport,
		//args: [...chromium.args, '--disable-gpu'],

		//executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		executablePath: "/usr/bin/google-chrome",
		headless: true,
		ignoreHTTPSErrors: true,
		args
	});

	browser.on("disconnected", () => {
		if (browser.process() != null) {
			console.log("Killing browser process");

			browser.process().kill("SIGINT");
		}

		console.log("Browser disconnected");

		puppeteerLaunch();
	});
};

async function buildBlobFromHtml(title, htmlString) {
	const cachedPdf = pdfCache.get(title || '');

	console.log("cachedPdf", title || '', !!cachedPdf);

	if (cachedPdf) {
		return Promise.resolve(cachedPdf);
	}

	if (htmlString) {
		if (!browser) {
			await puppeteerLaunch();
		}

		const page = await browser.newPage();
		await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36");
		await page.setContent(htmlString, { waitUntil: ['domcontentloaded', 'networkidle0'] });
		//await page.goto('data:text/html,' + htmlString, { waitUntil: ['domcontentloaded', 'networkidle0'] });

		const pdf = await page.pdf({ format: "Letter", printBackground: true });

		await page.close();

		const minutesUntilExpiration = 1440;

		if (title) {
			pdfCache.set(title, pdf, minutesUntilExpiration);
		}

		return pdf;
	}

	return;
}

function clearCache(title) {
	pdfCache.remove(title);
}
