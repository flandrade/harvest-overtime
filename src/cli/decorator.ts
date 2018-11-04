import * as path from "path";

export interface Files {
  inputPath: string;
  outputPath: string;
}

interface FilePath {
  default: string;
  file: string | null;
}

export function decorateArgs(
  input: FilePath,
  output: FilePath
): Files {
  const inputPath: string = <string> input.file || input.default;
  const outputPath: string = <string> output.file || output.default;
  return {
    inputPath: mkPathAbsolute(inputPath),
    outputPath: mkPathAbsolute(outputPath)
  };
}

function mkPathAbsolute(
  filePath: string
): string {
  return (filePath && !path.isAbsolute(filePath))
    ? path.join(process.cwd(), filePath)
    : filePath;
}
