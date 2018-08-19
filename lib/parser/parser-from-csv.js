"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("csv-parse/lib/sync");
function parse(input) {
    const csv = parser(input, {
        columns: true,
        trim: true
    });
    return csv.map(l => fromReport(l));
}
exports.default = parse;
function fromReport(report) {
    return {
        date: report.Date,
        employee: report["Employee?"] === "Yes",
        firstName: report["First Name"],
        hours: Number(report.Hours) || 0,
        lastName: report["Last Name"]
    };
}
