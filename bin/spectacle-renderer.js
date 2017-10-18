#!/usr/bin/env node
"use strict";

const createPDF = require("../lib/index");

const argv = require("yargs")
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
    }
  })
  .help().argv;

createPDF(argv.url, argv.print, argv.output);
