import * as fs from "fs";
import * as util from "util";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

export function read(filePath: string): Promise<string> {
  return readFileAsync(filePath, { encoding: "utf8" });
}

export function write(
  filePath: string
): (data: string) => Promise<void> {
  return data =>
    writeFileAsync(filePath, data, { encoding: "utf8" });
}
