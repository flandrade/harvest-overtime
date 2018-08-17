import { Employee, Timesheet, Report } from "../models";
export declare function getTimesheet(date: string, employees: Employee[]): Timesheet;
export declare function getOvertime(timesheet: Timesheet[]): Report;
