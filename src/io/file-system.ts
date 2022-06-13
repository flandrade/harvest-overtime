import * as fs from "fs";

const DEFAULT_ENCODING = { encoding: "utf8" as BufferEncoding };

const readFileAsync: (
  file: string,
  options: { encoding: BufferEncoding }
) => Promise<string> = fs.promises.readFile;

const writeFileAsync: (
  file: string,
  data: string,
  options: fs.WriteFileOptions
) => Promise<void> = fs.promises.writeFile;

export function read(filePath: string): Promise<string> {
  return readFileAsync(filePath, DEFAULT_ENCODING);
}
export function write(filePath: string, data: string): void {
  writeFileAsync(filePath, data, DEFAULT_ENCODING);
}
