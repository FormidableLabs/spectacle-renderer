const puppeteer = require("puppeteer");

const formatURL = function formatURL(host, print) {
  let u = host;

  // if (u[u.length - 1] !== "/") {
  //   u = u.concat("/");
  // }

  u = u.concat("#/?export");

  if (print === true) {
    u = u.concat("&print");
  }

  console.log("URL", u);

  return u;
};

const printPage = function printPage(page, host, print) {
  PAGE = p;
  return PAGE.goto(URL);
};

module.exports = function createPDF(host, print, filename) {
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
      page.evaluate(url => {
        // Change href on client-side.
        location.href = url;
        return Promise.resolve();
      }, formatURL(host, print))
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
