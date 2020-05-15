import { expect } from "chai";

import { ReportEmployee } from "../../src/models";
import { toError, toInfo, toTable } from "../../src/cli/presenter";
import { Options } from "../../src/cli/decorator";

describe("Cli.Presenter", () => {
  context("#toError", () => {
    context("when there is valid information", () => {
      it("presents the message", () => {
        const args: Options = {
          inputPath: "path/to/input",
          outputPath: "path/to/output",
          regularDayHours: 8
        };
        const error: Error = {
          name: "Error",
          message: "Error message"
        };
        const parsed: string = toError(args, error);
        expect(parsed).to.have.string("It was not possible to process");
        expect(parsed).to.have.string("path/to/input");
        expect(parsed).to.have.string("Error message");
      });
    });
  });

  context("#toInfo", () => {
    context("when there is valid information", () => {
      it("presents the message", () => {
        const args: Options = {
          inputPath: "path/to/input",
          outputPath: "path/to/output",
          regularDayHours: 8
        };
        const parsed: string = toInfo(args);
        expect(parsed).to.have.string("harvest-overtime");
        expect(parsed).to.have.string("Regular day hours:");
        expect(parsed).to.have.string("Input file:");
        expect(parsed).to.have.string("path/to/input");
        expect(parsed).to.have.string("Output file:");
        expect(parsed).to.have.string("path/to/output");
      });
    });
  });

  context("#toTable", () => {
    context("when there is a single element", () => {
      it("presents the element in the table", () => {
        const report: ReportEmployee[] = [
          {
            employee: "Jane",
            report: {
              weekdays: 5,
              weekends: 0
            },
            timesheet: [
              {
                date: "2018-08-06",
                hours: 10,
                isWeekend: false
              },
              {
                date: "2018-08-07",
                hours: 11,
                isWeekend: false
              }
            ]
          }
        ];
        const parsed: string = toTable(report);
        expect(parsed).to.have.string("Jane");
      });
    });

    context("when there are several elements", () => {
      it("present the elements in the table", () => {
        const report: ReportEmployee[] = [
          {
            employee: "Jane",
            report: {
              weekdays: 5,
              weekends: 0
            },
            timesheet: [
              {
                date: "2018-08-06",
                hours: 10,
                isWeekend: false
              },
              {
                date: "2018-08-07",
                hours: 11,
                isWeekend: false
              }
            ]
          },
          {
            employee: "Emily",
            report: {
              weekdays: 1,
              weekends: 1
            },
            timesheet: [
              {
                date: "2018-08-06",
                hours: 9,
                isWeekend: false
              },
              {
                date: "2018-08-11",
                hours: 1,
                isWeekend: false
              }
            ]
          }
        ];
        const parsed: string = toTable(report);
        expect(parsed).to.have.string("Jane");
        expect(parsed).to.have.string("Emily");
      });
    });
  });
});
