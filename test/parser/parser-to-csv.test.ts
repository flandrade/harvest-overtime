import { expect } from "chai";

import { ReportEmployee } from "../../src/models";
import parse from "../../src/parser/parser-to-csv";

describe("Parser.ParserToCsv", () => {
  context("when fields are valid", () => {
    context("when there is a single element", () => {
      it("parses the element", () => {
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
        const parsed: string = parse(report);
        expect(parsed).to.be.eql(
          '"Employee","Weekdays","Weekends","2018-08-06","2018-08-07"\n"Jane",5,0,10,11'
        );
      });
    });

    context("when there are several elements", () => {
      it("parses the element", () => {
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
        const parsed: string = parse(report);
        expect(parsed).to.be.eql(
          '"Employee","Weekdays","Weekends","2018-08-06","2018-08-07","2018-08-11"' +
            '\n"Jane",5,0,10,11,' +
            '\n"Emily",1,1,9,,1'
        );
      });
    });
  });

  context("when fields are invalid", () => {
    context("when fields are empty", () => {
      it("parses with empty fields", () => {
        const report: ReportEmployee[] = [
          {
            employee: "",
            report: {
              weekdays: 2,
              weekends: 0
            },
            timesheet: [
              {
                date: "2018-08-06",
                hours: 10,
                isWeekend: false
              }
            ]
          }
        ];
        const parsed: string = parse(report);
        expect(parsed).to.be.eql(
          '"Employee","Weekdays","Weekends","2018-08-06"\n"",2,0,10'
        );
      });
    });
  });
});
