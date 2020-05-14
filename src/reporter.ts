import * as Promise from "bluebird";

import { read, write } from "./io/file-system";
import parseFromReport from "./parser/parser-from-csv";
import parseToReport from "./parser/parser-to-csv";
import report from "./report/scraper";
import { ReportEmployee } from "./models";

export const CUR_VERSION: string = "2.1.1";
export const DEF_INPUT: string = "harvest.csv";
export const DEF_OUTPUT: string = "report.csv";
export const DEF_REGULAR_DAY_HOURS: string = "8";

export default function reporter(
  input: string,
  output: string,
  regularDayHours: number,
): Promise<ReportEmployee[]> {
  return read(input)
    .then(parseFromReport)
    .then(report(regularDayHours))
    .tap(report => {
      const csvInfo = parseToReport(report);
      write(output, csvInfo);
    })
}
