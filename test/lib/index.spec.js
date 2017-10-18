const createPage = require("../../lib/index");
const expect = require("chai").expect;
const path = require("path");
const fs = require("fs");

let pdfPath;

describe("createPage", () => {
  after(() => {
    fs.unlinkSync(pdfPath);
  });

  it("should create a PDF", () => {
    return createPage("http://google.com", false, "test.pdf")
      .then(() => {
        pdfPath = path.resolve("test.pdf");
        expect(fs.existsSync(pdfPath)).to.equal(true);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
