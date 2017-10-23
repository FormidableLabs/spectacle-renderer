const path = require("path");
const fs = require("fs");
const pify = require("pify");
const unlink = pify(fs.unlink);

const createPage = require("../src/");

describe("createPage", () => {
  let pdfPath;

  afterEach(() => (pdfPath ? unlink(pdfPath) : Promise.resolve()));

  it("should create a PDF", async () => {
    await createPage({
      url: "http://google.com",
      output: "test.pdf"
    }).catch(err => {
      throw new Error(err);
    });

    pdfPath = path.resolve("test.pdf");
    expect(fs.existsSync(pdfPath)).toBe(true);
  });
});
