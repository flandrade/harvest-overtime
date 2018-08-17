import { Employee, Timesheet, Report } from "../models";
export declare function getTimesheet(date: string, employees: Employee[]): Timesheet;
export declare function getReport(timesheet: Timesheet[]): Report;
