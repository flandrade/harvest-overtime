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
    return {
        weekdays: getOvertimeByType(timesheet, false),
        weekends: getOvertimeByType(timesheet, true),
    };
}
exports.getOvertime = getOvertime;
function getOvertimeByType(timesheet, isWeekend) {
    const hourListByDay = R.pipe(R.filter(n => n.isWeekend === isWeekend), R.map(n => n.hours))(timesheet);
    const totalDays = hourListByDay.length;
    const normalHours = isWeekend ? 0 : totalDays * 8;
    const totalHours = R.sum(hourListByDay);
    return R.sum(hourListByDay) - normalHours;
}
