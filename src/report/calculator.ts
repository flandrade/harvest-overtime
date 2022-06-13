import * as R from "ramda";

import { isWeekend, parseISO } from "date-fns";
import { Employee, Report, Timesheet } from "../models";

export function getTimesheet(date: string, employees: Employee[]): Timesheet {
  const reportByDay: Employee[] = R.filter((n) => n.date === date, employees);

  return {
    date,
    hours: R.sum(R.map((n) => n.hours, reportByDay)),
    isWeekend: isWeekend(parseISO(date)),
  };
}

export function getOvertime(
  timesheet: Timesheet[],
  regularDayHours: number
): Report {
  return {
    weekdays: getOvertimeByType(timesheet, false, regularDayHours),
    weekends: getOvertimeByType(timesheet, true, regularDayHours),
  };
}

function getOvertimeByType(
  timesheet: Timesheet[],
  isWeekEnd: boolean,
  regularDayHours: number
): number {
  const hourListByDay: number[] = timesheet
    .filter((n) => n.isWeekend === isWeekEnd)
    .map((n) => n.hours);
  const totalDays: number = hourListByDay.length;
  const regularHours: number = isWeekEnd ? 0 : totalDays * regularDayHours;
  const totalHours: number = R.sum(hourListByDay);

  return totalHours - regularHours;
}
