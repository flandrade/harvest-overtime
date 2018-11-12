import * as Promise from "bluebird";
import * as fs from "fs";

const DEFAULT_ENCODING: string = "utf8";

const readFileAsync: (
  file: string,
  encoding: string
) => Promise<string>
  = Promise.promisify<string, string, string>(fs.readFile);

const writeFileAsync: (
  file: string,
  data: any,
  options: fs.WriteFileOptions
) => Promise<void>
  = Promise.promisify<void, string, any, fs.WriteFileOptions>(fs.writeFile);

export function read(filePath: string): Promise<string> {
  return readFileAsync(filePath, DEFAULT_ENCODING);
}
export function write(
  filePath: string
): (data: string) => void {
  return data => {
    writeFileAsync(filePath, data, { encoding: DEFAULT_ENCODING });
  };
}
