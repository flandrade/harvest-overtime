import * as Promise from "bluebird";

import { read, write } from "./io";
import parseFromReport from "./parser/parser-from-csv";
import parseToReport from "./parser/parser-to-csv";
import report from "./report/scraper";

export const CUR_VERSION: string = "2.0.0";
export const DEF_INPUT: string = "harvest.csv";
export const DEF_OUTPUT: string = "report.csv";

export default function reporter(
  input: string,
  output: string
): Promise<void> {
  return read(input)
    .then(parseFromReport)
    .then(report)
    .then(parseToReport)
    .then(write(output));
}
