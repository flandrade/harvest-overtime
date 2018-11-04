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
  return csv.map(l => decorateReport(l));
}

function decorateReport(
  report: ReportRawCsv
): Employee {
  const fullName: string = `${report["First Name"]} ${report["Last Name"]}`;
  return {
    date: report.Date,
    employee: report["Employee?"] === "Yes",
    hours: Number(report.Hours) || 0,
    name: fullName.trim()
  };
}
