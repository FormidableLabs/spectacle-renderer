const puppeteer = require("puppeteer");

let BROWSER;
let PAGE;
let URL;

const createPage = function createPage(b) {
  BROWSER = b;
  return BROWSER.newPage();
};

const printPage = function printPage(p) {
  PAGE = p;
  return PAGE.goto(URL);
};

const formatURL = function formatURL(host, print) {
  let u = host;

  if (u[u.length - 1] !== "/") {
    u = u.concat("/");
  }

  u = u.concat("#/?export");

  if (print === true) {
    u = u.concat("&print");
  }
  return u;
};

module.exports = function createPDF(host, print, filename) {
  URL = formatURL(host, print);

  return puppeteer
    .launch()
    .then(createPage)
    .then(printPage)
    .then(() => PAGE.emulateMedia("screen"))
    .then(() =>
      PAGE.pdf({
        path: filename,
        printBackground: true,
        landscape: true,
        width: "800px"
      })
    )
    .then(() => BROWSER.close())
    .catch(err => {
      throw new Error(err);
    });
};
