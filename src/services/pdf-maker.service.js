"use strict";
const puppeteer = require("puppeteer-core");
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
		"--disable-setuid-sandbox",
		"--disable-dev-shm-usage",
		"--disable-session-crashed-bubble",
		"--disable-accelerated-2d-canvas",
		"--no-first-run",
		"--no-zygote",
		"--single-process",
		"--noerrdialogs",
		"--disable-gpu",
		"--hide-scrollbars",
		"--disable-web-security",
		"--font-render-hinting=none",
	];

	browser = await puppeteer.launch({
		executablePath: "/usr/bin/chromium-browser",
		headless: true,
		ignoreHTTPSErrors: true,
		args,
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
	// const browser = await puppeteer.launch({
	// 	executablePath: "/usr/bin/google-chrome-stable",
	// 	headless: true,
	// 	ignoreHTTPSErrors: true,
	// 	args: ["--hide-scrollbars", "--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
	// });

	const cachedPdf = pdfCache.get(title || '');

	console.log("cachedPdf", title || '', !!cachedPdf);

	if (cachedPdf) {
		return Promise.resolve(cachedPdf);
	}

	if (htmlString) {
		await puppeteerLaunch();

		if (!browser) {
			await puppeteerLaunch();
		}

		const page = await browser.newPage();

		await page.setContent(htmlString, { waitUntil: "networkidle0" });
		//await page.goto('data:text/html,' + htmlString, { waitUntil: 'networkidle0' });

		const pdf = await page.pdf({ format: "Letter" });

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
