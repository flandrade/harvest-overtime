"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("csv-parse/lib/sync");
function parse(input) {
    const csv = parser(input, {
        columns: true,
        trim: true
    });
    return csv.map(l => decorateReport(l));
}
exports.default = parse;
function decorateReport(report) {
    const fullName = `${report["First Name"]} ${report["Last Name"]}`;
    return {
        date: report.Date,
        employee: report["Employee?"] === "Yes",
        hours: Number(report.Hours) || 0,
        name: fullName.trim()
    };
}
