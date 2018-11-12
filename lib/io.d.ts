import * as Promise from "bluebird";
export declare function read(filePath: string): Promise<string>;
export declare function write(filePath: string): (data: string) => void;
