"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function decorateArgs(input, output) {
    const inputPath = input.file || input.default;
    const outputPath = output.file || output.default;
    return {
        inputPath: mkPathAbsolute(inputPath),
        outputPath: mkPathAbsolute(outputPath)
    };
}
exports.decorateArgs = decorateArgs;
function mkPathAbsolute(filePath) {
    return (filePath && !path.isAbsolute(filePath))
        ? path.join(process.cwd(), filePath)
        : filePath;
}
