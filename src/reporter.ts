import { read, write } from "./io";
import parseFromReport from "./parser/parser-from-csv";
import parseToReport from "./parser/parser-to-csv";
import report from "./report/scrapper";

const INPUT_PATH: string = "report.csv";
const OUPUT_PATH: string = "result.csv";

const fileInput: string = process.argv[2];
const fileOutput: string = process.argv[3];

export default function reporter(
  input: string = fileInput || INPUT_PATH,
  output: string = fileOutput || OUPUT_PATH
): void {
  console.log("Input file is", input);
  console.log("Output file is", output);
  read(input)
    .then(parseFromReport)
    .then(report)
    .then(parseToReport)
    .then(write(output))
    .catch(error =>
      console.error("There was an issue", error.message)
    );
}
