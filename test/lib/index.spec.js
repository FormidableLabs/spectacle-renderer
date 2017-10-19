const createPage = require("../../lib/index");
const expect = require("chai").expect;
const path = require("path");
const fs = require("fs");
const pify = require("pify");
const unlink = pify(fs.unlink);

let pdfPath;

describe("createPage", () => {
  after(() => unlink(pdfPath));

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
