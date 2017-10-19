/* global location */
const puppeteer = require("puppeteer");

const formatURL = function formatURL(host, print) {
  let u = host;

  u = u.concat("#/?export");

  if (print === true) {
    u = u.concat("&print");
  }

  return u;
};

module.exports = function createPDF(host, print, filename, delay) {
  let browser;
  let page;

  return puppeteer
    .launch()
    .then(b => {
      browser = b;
    })
    .then(() => browser.newPage())
    .then(p => {
      page = p;
    })
    .then(() => page.goto(host, { waitUntil: "networkidle" }))
    .then(() =>
      page.evaluate(
        (url, wait) => {
          // Change href on client-side.
          location.href = url;

          return new Promise(resolve => {
            setTimeout(resolve, wait);
          });
        },
        formatURL(host, print),
        delay
      )
    )
    .then(() => page.emulateMedia("screen"))
    .then(() =>
      page.pdf({
        path: filename,
        printBackground: true,
        landscape: true,
        width: "800px"
      })
    )
    .then(() => browser.close())
    .catch(err => {
      throw new Error(err);
    });
};
