"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json2csv_1 = require("json2csv");
const R = require("ramda");
function parseToReport(reportEmployee) {
    const report = reportEmployee.map(l => toReport(l));
    const json2csvParser = new json2csv_1.Parser();
    return json2csvParser.parse(report);
}
exports.default = parseToReport;
function toReport(reportEmployee) {
    const { report, employee, timesheet } = reportEmployee;
    const hours = R.map(t => ({ [t.date]: t.hours }), timesheet);
    return R.mergeAll([{
            Employee: employee
        }, {
            Weekdays: report.weekdays
        }, {
            Weekends: report.weekends
        }, ...hours]);
}
