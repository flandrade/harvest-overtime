import * as R from "ramda";

import { Employee, ReportEmployee, Timesheet } from "../models";
import { getOvertime, getTimesheet } from "./calculator";

export default function report(
  regularDayHours: number,
): (employees: Employee[]) => ReportEmployee[] {
  return (employees) => {
  const onlyEmployees: Employee[] = R.filter(n => n.employee, employees);
  const employeeNames: string[] = R.uniq(R.map(n => n.name, onlyEmployees));

  return R.map(n => getInformationByEmployee(n, onlyEmployees, regularDayHours), employeeNames);
  }
}

function getInformationByEmployee(
  firstName: string,
  employees: Employee[],
  regularDayHours: number,
): ReportEmployee {
  const employee: Employee[] = R.filter(n => n.name === firstName, employees);
  const dates: string[] = R.uniq(R.map(n => n.date, employee));
  const timesheet: Timesheet[] = getTimesheets(employee, dates);

  return {
    employee: firstName,
    report: getOvertime(timesheet, regularDayHours),
    timesheet
  };
}

function getTimesheets(
  employee: Employee[],
  dates: string[]
): Timesheet[] {
  return R.map(n => getTimesheet(n, employee), dates);
}
