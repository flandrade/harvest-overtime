import * as R from "ramda";

import { isWeekend } from "date-fns";
import { Employee, Report, Timesheet } from "../models";

export function getTimesheet(date: string, employees: Employee[]): Timesheet {
  const reportByDay: Employee[] = R.filter((n) => n.date === date, employees);

  return {
    date,
    hours: R.sum(R.map((n) => n.hours, reportByDay)),
    isWeekend: isWeekend(date),
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
  const hourListByDay: number[] = R.pipe<Timesheet[], Timesheet[], number[]>(
    R.filter<Timesheet>((n) => n.isWeekend === isWeekEnd),
    R.map<Timesheet, number>((n) => n.hours)
  )(timesheet);
  const totalDays: number = hourListByDay.length;
  const regularHours: number = isWeekEnd ? 0 : totalDays * regularDayHours;
  const totalHours: number = R.sum(hourListByDay);

  return totalHours - regularHours;
}
