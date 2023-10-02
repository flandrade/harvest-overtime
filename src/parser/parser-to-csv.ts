import { Parser } from "json2csv";
import * as R from "ramda";

import { ReportEmployee } from "../models";

interface ReportCsv {
  [x: string]: string | number;
}

export default function parseToReport(
  reportEmployee: ReportEmployee[]
): string {
  const report: ReportCsv[] = reportEmployee.map((l) => toReport(l));
  const json2csvParser = new Parser();
  return json2csvParser.parse(report);
}

/**
 * This function converts an employee Harvest report into a CSV report.
 * @param reportEmployee The employee report in JSON format.
 * @returns The report in CSV format.
 */
function toReport(reportEmployee: ReportEmployee): ReportCsv {
  const { report, employee, timesheet } = reportEmployee;
  const hours: ReportCsv[] = R.map((t) => ({ [t.date]: t.hours }), timesheet);

  return R.mergeAll([
    {
      Employee: employee,
    },
    {
      Weekdays: report.weekdays,
    },
    {
      Weekends: report.weekends,
    },
    ...hours,
  ]);
}
