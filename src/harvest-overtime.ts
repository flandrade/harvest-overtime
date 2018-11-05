#!/usr/bin/env node

import * as chalk from "chalk";
import * as program from "commander";

import { decorateArgs, Files } from "./cli/decorator";
import reporter, {
 CUR_VERSION,
 DEF_INPUT,
 DEF_OUTPUT
} from "./reporter";

const errorColor: chalk.Chalk = chalk.default.bold.red;
const infoColor: chalk.Chalk = chalk.default.bold.blue;

program
  .version(CUR_VERSION)
  .option("-i, --input [input]", `Path and name of the incoming CSV file. If not provided, will be '${DEF_INPUT}'`)
  .option("-o, --output [output]", `Path and name of the resulting CSV file. If not provided, will be '${DEF_OUTPUT}'`)
  .parse(process.argv);

const args: Files = decorateArgs(
  { default: DEF_INPUT, file: program.input },
  { default: DEF_OUTPUT, file: program.output },
);

reporter(args.inputPath, args.outputPath)
  .finally(() => {
    console.log(`Input file is ${infoColor(args.inputPath)}`);
  })
  .then(() => {
    console.log(`Done. Output file is ${infoColor(args.outputPath)}`);
  })
  .catch(error => {
    console.error(errorColor(`There was an issue. ${error.message}`));
  });
