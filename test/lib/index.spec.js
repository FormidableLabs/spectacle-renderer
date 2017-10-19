"use strict";

const createPage = require("../../lib/index");
const expect = require("chai").expect;
const path = require("path");
const fs = require("fs");
const pify = require("pify");
const unlink = pify(fs.unlink);

describe("createPage", () => {
  let pdfPath;

  afterEach(() => (pdfPath ? unlink(pdfPath) : Promise.resolve()));

  it("should create a PDF", () =>
    createPage({
      url: "http://google.com",
      output: "test.pdf"
    })
      .then(() => {
        pdfPath = path.resolve("test.pdf");
        expect(fs.existsSync(pdfPath)).to.equal(true);
      })
      .catch(err => {
        throw new Error(err);
      }));
});
