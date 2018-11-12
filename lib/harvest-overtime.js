#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const program = require("commander");
const decorator_1 = require("./cli/decorator");
const reporter_1 = require("./reporter");
const errorColor = chalk.default.bold.red;
const infoColor = chalk.default.bold.blue;
program
    .version(reporter_1.CUR_VERSION)
    .option("-i, --input [input]", `Path and name of the incoming CSV file. If not provided, will be '${reporter_1.DEF_INPUT}'`)
    .option("-o, --output [output]", `Path and name of the resulting CSV file. If not provided, will be '${reporter_1.DEF_OUTPUT}'`)
    .parse(process.argv);
const args = decorator_1.decorateArgs({ default: reporter_1.DEF_INPUT, file: program.input }, { default: reporter_1.DEF_OUTPUT, file: program.output });
reporter_1.default(args.inputPath, args.outputPath)
    .then(() => {
    console.log(`
      Input file is ${infoColor(args.inputPath)}.
      Output file is ${infoColor(args.outputPath)}.
    `);
})
    .catch((error) => {
    console.error(`
      It was not possible to process ${infoColor(args.inputPath)}.
      ${errorColor(error.message)}
    `);
});
