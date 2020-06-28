import * as Promise from "bluebird";
import * as fs from "fs";

const DEFAULT_ENCODING = "utf8";

const readFileAsync: (
  file: string,
  encoding: string
) => Promise<string>
  = Promise.promisify<string, string, string>(fs.readFile);

const writeFileAsync: (
  file: string,
  data: string,
  options: fs.WriteFileOptions
) => Promise<void>
  = Promise.promisify<void, string, string, fs.WriteFileOptions>(fs.writeFile);

export function read(filePath: string): Promise<string> {
  return readFileAsync(filePath, DEFAULT_ENCODING);
}
export function write(
  filePath: string,
  data: string
): void {
  writeFileAsync(filePath, data, { encoding: DEFAULT_ENCODING });
}
