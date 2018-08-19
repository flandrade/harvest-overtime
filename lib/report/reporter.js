"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const calculator_1 = require("./calculator");
function report(employees) {
    const onlyEmployees = R.filter(n => n.employee, employees);
    const employeeNames = R.uniq(R.map(n => n.firstName, onlyEmployees));
    return R.map(n => getInformationByEmployee(n, onlyEmployees), employeeNames);
}
exports.default = report;
function getInformationByEmployee(firstName, employees) {
    const employee = R.filter(n => n.firstName === firstName, employees);
    const dates = R.uniq(R.map(n => n.date, employee));
    const timesheet = getTimesheets(employee, dates);
    return {
        employee: firstName,
        report: calculator_1.getOvertime(timesheet),
        timesheet
    };
}
function getTimesheets(employee, dates) {
    return R.map(n => calculator_1.getTimesheet(n, employee), dates);
}
