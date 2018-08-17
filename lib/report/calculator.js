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
    const calculate = (predicate, t) => predicate ? t.hours : 0;
    const normalHours = timesheet.length * 8;
    const weekdaysTotal = R.sum(R.map(n => calculate(!n.isWeekend, n), timesheet));
    console.log({ weekdaysTotal });
    const weekdays = weekdaysTotal > 0 ? weekdaysTotal - normalHours : 0;
    const weekends = R.sum(R.map(n => calculate(n.isWeekend, n), timesheet));
    return {
        weekdays,
        weekends
    };
}
exports.getOvertime = getOvertime;
