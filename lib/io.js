"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
function read(filePath) {
    return readFileAsync(filePath, { encoding: "utf8" });
}
exports.read = read;
function write(filePath) {
    return data => writeFileAsync(filePath, data, { encoding: "utf8" });
}
exports.write = write;
