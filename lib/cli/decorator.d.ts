export interface Files {
    inputPath: string;
    outputPath: string;
}
interface FilePath {
    default: string;
    file: string | null;
}
export declare function decorateArgs(input: FilePath, output: FilePath): Files;
export {};
