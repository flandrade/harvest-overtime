#!/usr/bin/env node

import * as chalk from "chalk";
import * as program from "commander";

import { decorateArgs, Options } from "./cli/decorator";
import reporter, {
 CUR_VERSION,
 DEF_INPUT,
 DEF_OUTPUT,
 REGULAR_DAY_HOURS
} from "./reporter";

const errorColor: chalk.Chalk = chalk.default.bold.red;
const infoColor: chalk.Chalk = chalk.default.bold.blue;

program
  .version(CUR_VERSION)
  .option("-i, --input [input]", `Path and name of the incoming CSV file. If not provided, will be '${DEF_INPUT}'`)
  .option("-o, --output [output]", `Path and name of the resulting CSV file. If not provided, will be '${DEF_OUTPUT}'`)
  .option("-dh, --dhours [output]", `Regular working day hours. If not provided, will be '${REGULAR_DAY_HOURS} hours'`)
  .parse(process.argv);

const args: Options = decorateArgs(
  { default: DEF_INPUT, option: program.input },
  { default: DEF_OUTPUT, option: program.output },
  { default: REGULAR_DAY_HOURS, option: program.dhours },
);

reporter(args.inputPath, args.outputPath, args.regularDayHours)
  .then(() => {
    console.log(`
      Regular day hours: ${infoColor(String(args.regularDayHours))}.
      Input file is ${infoColor(args.inputPath)}.
      Output file is ${infoColor(args.outputPath)}.
    `);
  })
  .catch((error: Error) => {
    console.error(`
      It was not possible to process ${infoColor(args.inputPath)}.
      ${errorColor(error.message)}
    `);
  });
