import { Employee } from "../models";

const parser = require("csv-parse/lib/sync");

interface ReportRawCsv {
  readonly "Employee?": string;
  readonly "First Name": string;
  readonly "Last Name": string;
  readonly Date: string;
  readonly Hours: string;
}

export default function parse(
  input: string
): Employee[] {
  const csv: ReportRawCsv[] = parser(input, {
    columns: true,
    trim: true
  });
  return csv.map(l => fromReport(l));
}

function fromReport(
  report: ReportRawCsv
): Employee {
  return {
    date: report.Date,
    employee: report["Employee?"] === "Yes",
    firstName: report["First Name"],
    hours: Number(report.Hours) || 0,
    lastName: report["Last Name"]
  };
}
