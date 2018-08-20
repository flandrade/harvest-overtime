"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("./io");
const parser_from_csv_1 = require("./parser/parser-from-csv");
const parser_to_csv_1 = require("./parser/parser-to-csv");
const scraper_1 = require("./report/scraper");
const INPUT_PATH = "harvest.csv";
const OUPUT_PATH = "report.csv";
const fileInput = process.argv[2];
const fileOutput = process.argv[3];
function reporter(input = fileInput || INPUT_PATH, output = fileOutput || OUPUT_PATH) {
    console.log("Input file is", input);
    io_1.read(input)
        .then(parser_from_csv_1.default)
        .then(scraper_1.default)
        .then(parser_to_csv_1.default)
        .then(io_1.write(output))
        .then(() => console.log("Done. Output file is", output))
        .catch(error => console.error("There was an issue", error.message));
}
exports.default = reporter;
