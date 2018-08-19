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
function getOvertime(timesheet) {
    const x = {
        weekdays: getOvertimeByType(timesheet, false),
        weekends: getOvertimeByType(timesheet, true),
    };
    return x;
}
exports.getOvertime = getOvertime;
function getOvertimeByType(timesheet, isWeekend) {
    const hoursByType = R.pipe(R.filter(n => n.isWeekend == isWeekend), R.map(n => n.hours))(timesheet);
    const totalDays = hoursByType.length;
    const normalHours = isWeekend ? 0 : totalDays * 8;
    return R.sum(hoursByType) - normalHours;
}
