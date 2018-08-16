import { Employee, Report } from "./models"
import * as R from "ramda";

export default function check(
  employees: Employee[]
): Report[] {
  const onlyEmployees: Employee[] = R.filter(n => n.employee, employees);
  const employeeNames: string[] = R.uniq(R.map(n => n.firstName, onlyEmployees));

  return R.map(n => getInformationByEmployee(n, onlyEmployees), employeeNames);
}

function getInformationByEmployee(
  firstName: string,
  employees: Employee[]
): Report {
  const employee: Employee[] = R.filter(n => n.firstName == firstName, employees)
  const dates: string[] = R.uniq(R.map(n => n.date, employee));
  return {
    [firstName]: R.map(n => {
      return { [n]: getHoursByDate(n, employee) }
    },
      dates
    )
  }
}

function getHoursByDate(
  date: string,
  employees: Employee[]
): number {
  const reportByDay = R.filter(n => n.date === date, employees)
  return R.sum((R.map(n => n.hours, reportByDay)));
}
