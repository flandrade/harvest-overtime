import * as Promise from "bluebird";

import { read, write } from "./io";
import parseFromReport from "./parser/parser-from-csv";
import parseToReport from "./parser/parser-to-csv";
import report from "./report/scraper";

export const CUR_VERSION: string = "2.1.1";
export const DEF_INPUT: string = "harvest.csv";
export const DEF_OUTPUT: string = "report.csv";
export const REGULAR_DAY_HOURS: string = "8";

export default function reporter(
  input: string,
  output: string,
  regularDayHours: number,
): Promise<void> {
  return read(input)
    .then(parseFromReport)
    .then((employeeList) => report(employeeList, regularDayHours))
    .then(parseToReport)
    .then(write(output));
}
