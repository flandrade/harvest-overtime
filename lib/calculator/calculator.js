"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const date_fns_1 = require("date-fns");
function getTimesheet(date, employees) {
    const reportByDay = R.filter(n => n.date === date, employees);
    return {
        date,
        hours: R.sum((R.map(n => n.hours, reportByDay))),
        isWeekend: date_fns_1.isWeekend(date)
    };
}
exports.getTimesheet = getTimesheet;
function getReport(timesheet) {
    const calculate = (predicate, t) => predicate ? t.hours : 0;
    const normalHours = timesheet.length * 8;
    const weekends = R.sum(R.map(n => calculate(n.isWeekend, n), timesheet));
    const weekdays = R.sum(R.map(n => calculate(!n.isWeekend, n), timesheet)) - normalHours;
    return {
        weekdays,
        weekends
    };
}
exports.getReport = getReport;
