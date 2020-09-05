import * as path from "path";

export interface Options {
  inputPath: string;
  outputPath: string;
  regularDayHours: number;
}

interface OptionParams<T> {
  default: T;
  option: string | null;
}

export function decorateArgs(
  input: OptionParams<string>,
  output: OptionParams<string>,
  rDayHours: OptionParams<string>
): Options {
  const inputPath: string = mkPathAbsolute(input.option, input.default);
  const outputPath: string = mkPathAbsolute(output.option, output.default);
  const regularDayHours: number = mkNumber(rDayHours.option, rDayHours.default);
  return {
    inputPath,
    outputPath,
    regularDayHours,
  };
}

function mkPathAbsolute(
  maybeFilePath: string | null,
  defaultPath: string
): string {
  const filePath = maybeFilePath ?? defaultPath;
  return filePath && !path.isAbsolute(filePath)
    ? path.join(process.cwd(), filePath)
    : filePath;
}

function mkNumber(maybeValue: string | null, defaultValue: string): number {
  const value = maybeValue ?? defaultValue;
  const result = Number(value);
  return isNaN(result) ? Number(defaultValue) : result;
}
