import { read } from "./io";
import parse from "./parser/parser-from-csv";
import report from "./report/reporter";

const filePath: string = "report.csv";
const fileArg: string = process.argv[2];

export default function main(
  path: string = fileArg || filePath
): void {
  console.log("File is", path);
  read(path)
    .then(parse)
    .then(report)
    .then(result =>
      console.log(JSON.stringify(result, null, 2))
    )
    .catch(error =>
      console.log("There was an issue", error.message)
    );
}

main();
