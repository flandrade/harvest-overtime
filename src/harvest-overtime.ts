#!/usr/bin/env node

import * as program from "commander";

import { decorateArgs, Options } from "./cli/decorator";
import reporter, {
 CUR_VERSION,
 DEF_INPUT,
 DEF_OUTPUT,
 DEF_REGULAR_DAY_HOURS
} from "./reporter";
import { toError, toInfo, toTable } from "./cli/presenter";

program
  .version(CUR_VERSION)
  .option("-i, --input [input]", `Path and name of the incoming CSV file. If not provided, will be '${DEF_INPUT}'`)
  .option("-o, --output [output]", `Path and name of the resulting CSV file. If not provided, will be '${DEF_OUTPUT}'`)
  .option("-dh, --dayhours [hours]", `Regular working day hours. If not provided, will be '${DEF_REGULAR_DAY_HOURS}' hours`)
  .option("-p, --print", `Print report to the standard output. If not set, it won't print the report`)
  .parse(process.argv);

const args: Options = decorateArgs(
  { default: DEF_INPUT, option: program.input },
  { default: DEF_OUTPUT, option: program.output },
  { default: DEF_REGULAR_DAY_HOURS, option: program.dayhours },
);

reporter(args.inputPath, args.outputPath, args.regularDayHours)
  .then(report => {
    console.log(toInfo(args));
    if (program.print) console.log(toTable(report))
  })
  .catch((error: Error) => {
    console.error(toError(args, error));
  });
