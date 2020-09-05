import * as Promise from "bluebird";

import { read, write } from "./io/file-system";
import { ReportEmployee } from "./models";
import parseFromReport from "./parser/parser-from-csv";
import parseToReport from "./parser/parser-to-csv";
import report from "./report/scraper";

export const CUR_VERSION = "2.2.1";
export const DEF_INPUT = "harvest.csv";
export const DEF_OUTPUT = "report.csv";
export const DEF_REGULAR_DAY_HOURS = "8";

export default function reporter(
  input: string,
  output: string,
  regularDayHours: number
): Promise<ReportEmployee[]> {
  return read(input)
    .then(parseFromReport)
    .then(report(regularDayHours))
    .tap((res) => {
      const csvInfo = parseToReport(res);
      write(output, csvInfo);
    });
}
