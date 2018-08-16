import check from "./checker";
import parse from "./parser";
import { read } from "./reader";

const filePath: string ="report.csv";
const fileArg: string = process.argv[2];

export default function report(
  path: string = fileArg || filePath
): void {
  console.log("File is", path);
  read(path)
    .then(parse)
    .then(check)
    .then(result =>
      console.log(JSON.stringify(result, null, 2))
    )
    .catch(error =>
      console.log("There was an issue", error.message)
    );
}

report();
