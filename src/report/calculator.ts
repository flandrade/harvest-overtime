import * as R from "ramda";
import { isWeekend } from "date-fns";

import { Employee, Timesheet, Report } from "../models"

export function getTimesheet(
  date: string,
  employees: Employee[]
): Timesheet {
  const reportByDay: Employee[] = R.filter(n => n.date === date, employees);

  return {
    date,
    hours: R.sum((R.map(n => n.hours, reportByDay))),
    isWeekend: isWeekend(date)
  }
}

export function getOvertime(
  timesheet: Timesheet[]
): Report {
  const calculate = (predicate: boolean, t: Timesheet) => predicate ? t.hours : 0;
  const normalHours: number = timesheet.length * 8;
  const weekdaysTotal: number = R.sum(
    R.map(n => calculate(!n.isWeekend, n), timesheet)
  );
  const weekdays: number = weekdaysTotal > 0 ? weekdaysTotal - normalHours : 0;
  const weekends: number = R.sum(
    R.map(n => calculate(n.isWeekend, n), timesheet)
  );

  return {
    weekdays,
    weekends
  }
}
