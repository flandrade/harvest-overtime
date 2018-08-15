import * as fs from "fs";
import * as util from "util";

const readFileAsync = util.promisify(fs.readFile);

export function readFile(filePath: string): Promise<string> {
  return readFileAsync(filePath, { encoding: "utf8" });
}
