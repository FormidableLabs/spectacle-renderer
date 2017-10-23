const puppeteer = require("puppeteer");

const formatURL = function formatURL(host, print) {
  return host
    .slice(0)
    .concat("#/?export")
    .concat(print === true ? "&print" : "");
};

/**
 * Create a PDF from spectacle location.
 *
 * @param {Object}  opts        options
 * @param {String}  opts.url    URL of presentation
 * @param {Boolean} opts.print  print mode?
 * @param {String}  opts.output path to created PDF
 * @param {Number}  opts.delay  wait in MS for resources to load
 * @returns {Promise}           promise indicating finished state
 */
module.exports = async function createPDF(opts = {}) {
  const url = opts.url;
  const print = !!opts.print;
  const output = opts.output || "presentation.pdf";
  const delay = opts.delay || 0;
  const chromium = opts.chromium;

  if (!url) {
    return Promise.reject(new Error("Url is required"));
  }

  const browser = await puppeteer.launch({ executablePath: chromium });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  await page.evaluate(
    (formattedUrl, wait) => {
      // Change href on client-side.
      location.href = formattedUrl;

      return new Promise(resolve => {
        setTimeout(resolve, wait);
      });
    },
    formatURL(url, print),
    delay
  );

  await page.emulateMedia("screen");

  await page.pdf({
    path: output,
    printBackground: true,
    landscape: true,
    width: 800
  });

  await browser.close();
};
