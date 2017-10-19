"use strict";

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
module.exports = function createPDF(opts) {
  opts = opts || {};
  const url = opts.url;
  const print = !!opts.print;
  const output = opts.output || "presentation.pdf";
  const delay = opts.delay || 0;
  const chromium = opts.chromium;
  let browser;
  let page;

  if (!url) {
    return Promise.reject(new Error("Url is required"));
  }

  return puppeteer
    .launch({
      executablePath: chromium
    })
    .then(b => {
      browser = b;
    })
    .then(() => browser.newPage())
    .then(p => {
      page = p;
    })
    .then(() => page.goto(url, { waitUntil: "networkidle" }))
    .then(() =>
      page.evaluate(
        (formattedUrl, wait) => {
          // Change href on client-side.
          location.href = formattedUrl;

          return new Promise(resolve => {
            setTimeout(resolve, wait);
          });
        },
        formatURL(url, print),
        delay
      )
    )
    .then(() => page.emulateMedia("screen"))
    .then(() =>
      page.pdf({
        path: output,
        printBackground: true,
        landscape: true,
        width: "800px"
      })
    )
    .then(() => browser.close());
};
