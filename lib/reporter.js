"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("./io");
const parser_from_csv_1 = require("./parser/parser-from-csv");
const parser_to_csv_1 = require("./parser/parser-to-csv");
const scraper_1 = require("./report/scraper");
exports.CUR_VERSION = "2.0.0";
exports.DEF_INPUT = "harvest.csv";
exports.DEF_OUTPUT = "report.csv";
function reporter(input, output) {
    return io_1.read(input)
        .then(parser_from_csv_1.default)
        .then(scraper_1.default)
        .then(parser_to_csv_1.default)
        .then(io_1.write(output));
}
exports.default = reporter;
