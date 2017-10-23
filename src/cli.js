#!/usr/bin/env node
const createPDF = require("./");
const yargs = require("yargs");

const args = yargs
  .usage("Usage: spectacle-renderer [options] filename")
  .command("* [options]", "Render your presentation", {
    u: {
      alias: "url",
      default: "http://localhost:3000"
    },
    o: {
      alias: "output",
      default: "presentation.pdf"
    },
    p: {
      alias: "print",
      default: false
    },
    d: {
      alias: "delay",
      default: 2000
    },
    c: {
      alias: "chromium"
    }
  })
  .help().argv;

createPDF(args);
