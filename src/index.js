"use strict";

const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

async function getPDF(url) {
	const html = `<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	   <head>
		  <style>
			 @import url("https://fonts.googleapis.com/css?family=Lato:300,400,700");
			 @import url("https://schuil.com/wp-content/themes/realhomes-child/dompdf/property-css-test.css?22s1");
			</style>
	   </head>
	   <body style="-webkit-print-color-adjust:exact;">
		  <section class="cover">
			 <div class="page-title-section">
							<div class="page-title-lines">
									<div class="line"></div>
									<div class="line"></div>
									<div class="line mb-0"></div>
							</div>
						 <table class="page-title-row">
							 <tr>
									<td class="page-title-placeholder"></td>
									<td class="page-title-cut-off block-cut-off">
									</td>
									<td class="page-title-block page-title">
										<h1>Title Antonio</h1>
									</td>
							 </tr>
						 </table>
			 </div>
			 <img src="https://schuil.com/wp-content/uploads/2020/06/20200610_163811791_iOS-2-1695x2195.jpg" class="cover-background"/>
			 <div class="content">
				<table class="cover-info-container-logo">
				   <tr>
					  <td class="logo-box">
						 <img src="https://schuil.com/wp-content/themes/realhomes-child/img/schuil-and-associates-logo.png" class="cover-logo"/>
					  </td>
				   </tr>
				</table>
				<table class="cover-info-container-block">
				   <tr>
					  <td class="info-box">
						 <div class="row"><span class="h1">West Tulare Walnuts</span></div>
						 <div class="row">
													<div class="col-6">
														<div class="col-12">
															<p>3401 W Oakdale Ave, Tulare, CA 93274, USA</p>
														</div>
														<div class="col-12">
															<p style="padding-bottom:0">CalBRE: 00845607</p>
														</div>
												</div>
												<div class="col-6">
														<div class="col-12"><span class="h2 mb-1">Schuil & Associates</span></div>
														<div class="col-12">
															<p>559-734-1700&nbsp;&middot;&nbsp;www.schuil.com</p>
														</div>
												</div>
								   </div>
			 </div>
			 </td>
			 <td class="info-box-cut"></td>
			 </tr>
			 </table>
			 </div>
		  </section>
		  <section class="page prop-info">
			 <div class="page-title-section">
				<div class="page-title-lines">
				   <div class="line"></div>
				   <div class="line"></div>
				   <div class="line mb-0"></div>
				</div>
				<div class="page-title-block">
				   <div class="block-cut-off"></div>
				   <div class="page-title">Listing Details</div>
				</div>
			 </div>
			 <div class="content">
				<header>
				   <table>
					  <tr>
						 <td>
							<div class="center">
							   <img class="header-img" src="https://schuil.com/wp-content/themes/realhomes-child/img/schuil-brochure-interior-logo.png"/>
							</div>
						 </td>
					  </tr>
				   </table>
				</header>
				<div class="the-stuff">
				   <table class="property-detail">
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Size:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td>
							<p>+/-39.40 assessed acres.</p>
						 </td>
					  </tr>
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Location:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td>
							<p>3401 W Oakdale Ave, Tulare, CA 93274, USA (Estimated Address)<br />
							   GPS coordinates: 36.256482, -119.387229
							</p>
						 </td>
					  </tr>
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Ground Water:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td>
							<p>On-site well with 50 HP submersible pump.</p>
						 </td>
					  </tr>
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Surface Water:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td>
							<p>Second water source provided by Tulare Irrigation District.</p>
						 </td>
					  </tr>
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Plantings:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td>
							<p>+/-15 net acres of Serr Walnuts planted in the 1980s. 30 ft x 28 ft spacing.<br />
							   +/-23.5 net acres of Sunland Walnuts planted in the 1980s. 30 ft x 28 ft spacing.
							</p>
						 </td>
					  </tr>
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Soils:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td>
							<p>Class 1 (excellent) soil: Tagus loam, 0 to 2 percent slopes.</p>
						 </td>
					  </tr>
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Legal:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td>
							<p>Tulare County APN 148-030-010. Property is enrolled in the Williamson Act.</p>
						 </td>
					  </tr>
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Price:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td class="property-detail-price">
							<p>$1,339,600</p>
						 </td>
					  </tr>
					  <tr>
						 <td class="property-detail-label-container">
							<div class="property-detail-label">
							   <h2>Contact:</h2>
							</div>
							<div class="block-cut-off"></div>
						 </td>
						 <td>
							<table style="margin-top:-3px">
							   <tr>
								  <td style="padding-right:15px">Jonathan Verhoeven<br>559-734-1700 ext.201 (o)<br>559-707-5658 (m)<br>jonathan@schuil.com<br>CalBRE #01966852</td>
								  <td style="padding-right:15px">Scott Schuil<br>559-734-1700 ext.106 (o)<br>559-859-9734 (m)<br>scott@schuil.com<br>CalBRE #01877812</td>
								  <td style="padding-right:15px">Marc Schuil<br>559-734-1700 ext.102 (o)<br>559-280-1750 (m)<br>marc@schuil.com<br>CalBRE #00815172</td>
							   </tr>
							</table>
						 </td>
					  </tr>
				   </table>
				</div>
			 </div>
			 <footer>
				<div>
				   <div class="disclaimer">
					  <p>The information contained in this brochure is from reliable sources and is believed to be correct, but is NOT guaranteed.</p>
					  <div class="contact-info">5020 W Mineral King Avenue, Visalia, CA &nbsp;&bull;&nbsp; 559-734-1700 &nbsp;&bull;&nbsp; www.schuil.com</div>
				   </div>
				</div>
			 </footer>
		  </section>
		  <section class="page map">
			 <div class="page-title-section">
				<div class="page-title-lines">
				   <div class="line"></div>
				   <div class="line"></div>
				   <div class="line mb-0"></div>
				</div>
				<div class="page-title-block">
				   <div class="block-cut-off"></div>
				   <div class="page-title">Aerial</div>
				</div>
			 </div>
			 <div class="content">
				<div class="the-stuff"><img class="full-map-image border" src="https://schuil.com/wp-content/uploads/2020/06/Aerial-800x800.jpg"/>
				</div>
			 </div>
			 <footer>
				<div>
				   <div class="disclaimer">
					  <p>The information contained in this brochure is from reliable sources and is believed to be correct, but is NOT guaranteed.</p>
					  <div class="contact-info">5020 W Mineral King Avenue, Visalia, CA &nbsp;&bull;&nbsp; 559-734-1700 &nbsp;&bull;&nbsp; www.schuil.com</div>
				   </div>
				</div>
			 </footer>
		  </section>
		  <section class="page map">
			 <div class="page-title-section">
				<div class="page-title-lines">
				   <div class="line"></div>
				   <div class="line"></div>
				   <div class="line mb-0"></div>
				</div>
				<div class="page-title-block">
				   <div class="block-cut-off"></div>
				   <div class="page-title">Planting Map</div>
				</div>
			 </div>
			 <div class="content">
				<div class="the-stuff"><img class="full-map-image border" src="https://schuil.com/wp-content/uploads/2020/06/Planting-Map-800x800.jpg"/>
				</div>
			 </div>
			 <footer>
				<div>
				   <div class="disclaimer">
					  <p>The information contained in this brochure is from reliable sources and is believed to be correct, but is NOT guaranteed.</p>
					  <div class="contact-info">5020 W Mineral King Avenue, Visalia, CA &nbsp;&bull;&nbsp; 559-734-1700 &nbsp;&bull;&nbsp; www.schuil.com</div>
				   </div>
				</div>
			 </footer>
		  </section>
		  <section class="page map">
			 <div class="page-title-section">
				<div class="page-title-lines">
				   <div class="line"></div>
				   <div class="line"></div>
				   <div class="line mb-0"></div>
				</div>
				<div class="page-title-block">
				   <div class="block-cut-off"></div>
				   <div class="page-title">Soil Map</div>
				</div>
			 </div>
			 <div class="content">
				<div class="the-stuff">
				   <div class="container-map-two-thirds"><img src="https://schuil.com/wp-content/uploads/2020/06/Screenshot-77-490x490.png" class="map-two-thirds border"></div>
				   <div class="container-map-one-third"><img src="https://schuil.com/wp-content/uploads/2020/06/Screenshot-79-742x240.png" class="map-one-third border"></div>
				</div>
			 </div>
			 <footer>
				<div>
				   <div class="disclaimer">
					  <p>The information contained in this brochure is from reliable sources and is believed to be correct, but is NOT guaranteed.</p>
					  <div class="contact-info">5020 W Mineral King Avenue, Visalia, CA &nbsp;&bull;&nbsp; 559-734-1700 &nbsp;&bull;&nbsp; www.schuil.com</div>
				   </div>
				</div>
			 </footer>
		  </section>
		  <section class="page map">
			 <div class="page-title-section">
				<div class="page-title-lines">
				   <div class="line"></div>
				   <div class="line"></div>
				   <div class="line mb-0"></div>
				</div>
				<div class="page-title-block">
				   <div class="block-cut-off"></div>
				   <div class="page-title">Location</div>
				</div>
			 </div>
			 <div class="content">
				<div class="the-stuff"><img class="full-map-image border" src="https://schuil.com/wp-content/uploads/2020/06/Location-2.jpg"/>
				</div>
			 </div>
			 <footer>
				<div>
				   <div class="disclaimer">
					  <p>The information contained in this brochure is from reliable sources and is believed to be correct, but is NOT guaranteed.</p>
					  <div class="contact-info">5020 W Mineral King Avenue, Visalia, CA &nbsp;&bull;&nbsp; 559-734-1700 &nbsp;&bull;&nbsp; www.schuil.com</div>
				   </div>
				</div>
			 </footer>
		  </section>
		  <section class="page">
			 <div class="page-title-section">
				<div class="page-title-lines">
				   <div class="line"></div>
				   <div class="line"></div>
				   <div class="line mb-0"></div>
				</div>
				<div class="page-title-block">
				   <div class="block-cut-off"></div>
				   <div class="page-title">Photos</div>
				</div>
			 </div>
			 <div class="content">
				<div class="the-stuff">
				   <table cellpadding='5' class='six-grid'>
					  <tr>
						 <td><img src="https://schuil.com/wp-content/uploads/2020/06/DJI_0619-2-600x400.jpg" class="grid-image border"></td>
						 <td><img src="https://schuil.com/wp-content/uploads/2020/06/1-600x400.jpg" class="grid-image border"></td>
					  </tr>
					  <tr>
						 <td><img src="https://schuil.com/wp-content/uploads/2020/06/20200610_163545117_iOS-2-600x400.jpg" class="grid-image border"></td>
						 <td><img src="https://schuil.com/wp-content/uploads/2020/06/DJI_0606-2-600x400.jpg" class="grid-image border"></td>
					  </tr>
					  <tr>
						 <td><img src="https://schuil.com/wp-content/uploads/2020/06/DJI_0615-2-600x400.jpg" class="grid-image border"></td>
						 <td><img src="https://schuil.com/wp-content/uploads/2020/06/DJI_0617-2-600x400.jpg" class="grid-image border"></td>
					  </tr>
				   </table>
				</div>
			 </div>
			 <footer>
				<div>
				   <div class="disclaimer">
					  <p>The information contained in this brochure is from reliable sources and is believed to be correct, but is NOT guaranteed.</p>
					  <div class="contact-info">5020 W Mineral King Avenue, Visalia, CA &nbsp;&bull;&nbsp; 559-734-1700 &nbsp;&bull;&nbsp; www.schuil.com</div>
				   </div>
				</div>
			 </footer>
			 </div>
		  </section>
	   </body>
	</html>`;

	const browser = await puppeteer.launch({
		executablePath: "/usr/bin/google-chrome-stable",
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});

	const page = await browser.newPage();
	await page.setContent(html);
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
