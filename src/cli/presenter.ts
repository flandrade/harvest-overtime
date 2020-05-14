import * as chalk from "chalk";

import { ReportEmployee } from "../models";
import { Options } from "./decorator";

const Table = require("cli-table3");

const bold: chalk.Chalk = chalk.default.bold;
const errorColor: chalk.Chalk = chalk.default.bold.red;
const infoColor: chalk.Chalk = chalk.default.bold.blue;
const titleColor: chalk.Chalk = chalk.default.bold.bgRedBright;

const TITLE = `${titleColor("harvest-overtime")} ⏰`;

export function toError(
  args: Options,
  error: Error
): string {
  const msg = `It was not possible to process ${infoColor(args.inputPath)}`;
  return `${TITLE}\n\n${msg}\n${errorColor(error.message)}\n`;
}

export function toInfo(args: Options): string {
  const hours = `${bold("Regular day hours:")} ${infoColor(String(args.regularDayHours))}`;
  const input = `${bold("Input file:")} ${infoColor(args.inputPath)}`;
  const output = `${bold("Output file:")} ${infoColor(args.outputPath)}`;
  return `${TITLE}\n\n${hours}\n${input}\n${output}\n`;
}

export function toTable(reportEmployee: ReportEmployee[]): string {
  const table = new Table({
    head: ["Employee", "Weekdays", "Weekends"]
  });
  const body = reportEmployee.map(({ report, employee }) => {
    return [(employee), setHour(report.weekdays), setHour(report.weekends)];
  });

  table.push(...body);
  return table.toString();
}

function setHour(number: number): string {
  const fixedNumber = number.toFixed(4);
  if (number > 0) {
    return errorColor(fixedNumber);
  }
  return fixedNumber;
}