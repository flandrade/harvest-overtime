"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("bluebird");
const fs = require("fs");
const DEFAULT_ENCODING = "utf8";
const readFileAsync = Promise.promisify(fs.readFile);
const writeFileAsync = Promise.promisify(fs.writeFile);
function read(filePath) {
    return readFileAsync(filePath, DEFAULT_ENCODING);
}
exports.read = read;
function write(filePath) {
    return data => {
        writeFileAsync(filePath, data, { encoding: DEFAULT_ENCODING });
    };
}
exports.write = write;
