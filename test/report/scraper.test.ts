import { expect } from "chai";

import { Employee, ReportEmployee } from "../../src/models";
import report from "../../src/report/scraper";

const REGULAR_DAY_HOURS = 8;

describe("Reporter.Scraper", () => {
  context("when there is an element", () => {
    context("and is an employee", () => {
      it("returns the report", () => {
        const employees: Employee[] = [
          {
            date: "2018-08-06",
            employee: true,
            hours: 5,
            name: "Jane Austen"
          }
        ];
        const result: ReportEmployee[] = report(REGULAR_DAY_HOURS)(employees);
        expect(result[0]).to.have.property("employee", "Jane Austen");
        expect(result[0]).to.have.property("report");
        expect(result[0]).to.have.property("timesheet");
      });
    });

    context("and is not an employee", () => {
      it("returns an empty report", () => {
        const employees: Employee[] = [
          {
            date: "2018-08-06",
            employee: false,
            hours: 5,
            name: "Jane Austen"
          }
        ];
        const result: ReportEmployee[] = report(REGULAR_DAY_HOURS)(employees);
        expect(result).to.be.empty;
      });
    });
  });

  context("when there are several elements", () => {
    context("and there are several employees", () => {
      context("and there is a single entry for each one", () => {
        it("returns the reports", () => {
          const employees: Employee[] = [
            {
              date: "2018-08-06",
              employee: true,
              hours: 5,
              name: "Jane Austen"
            },
            {
              date: "2018-08-07",
              employee: true,
              hours: 8,
              name: "Emily Bronte"
            }
          ];
          const result: ReportEmployee[] = report(REGULAR_DAY_HOURS)(employees);
          expect(result).to.have.lengthOf(2);
          expect(result[0]).to.have.property("employee", "Jane Austen");
          expect(result[0]).to.have.property("report");
          expect(result[0]).to.have.property("timesheet");
          expect(result[1]).to.have.property("employee", "Emily Bronte");
          expect(result[1]).to.have.property("report");
          expect(result[1]).to.have.property("timesheet");
        });
      });

      context("and there are several entries for each one", () => {
        it("returns the reports", () => {
          const employees: Employee[] = [
            {
              date: "2018-08-06",
              employee: true,
              hours: 5,
              name: "Jane Austen"
            },
            {
              date: "2018-08-07",
              employee: true,
              hours: 8,
              name: "Emily Bronte"
            },
            {
              date: "2018-08-06",
              employee: true,
              hours: 2,
              name: "Jane Austen"
            },
            {
              date: "2018-08-07",
              employee: true,
              hours: 1,
              name: "Emily Bronte"
            }
          ];
          const result: ReportEmployee[] = report(REGULAR_DAY_HOURS)(employees);
          expect(result).to.have.lengthOf(2);
          expect(result[0]).to.have.property("employee", "Jane Austen");
          expect(result[0]).to.have.property("report");
          expect(result[0]).to.have.property("timesheet");
          expect(result[1]).to.have.property("employee", "Emily Bronte");
          expect(result[1]).to.have.property("report");
          expect(result[1]).to.have.property("timesheet");
        });
      });
    });

    context("and there are several employees and non-employee", () => {
      it("returns the reports without non-employees", () => {
        const employees: Employee[] = [
          {
            date: "2018-08-06",
            employee: true,
            hours: 5,
            name: "Jane Austen"
          },
          {
            date: "2018-08-07",
            employee: false,
            hours: 8,
            name: "Emily Bronte"
          }
        ];
        const result: ReportEmployee[] = report(REGULAR_DAY_HOURS)(employees);
        expect(result).to.have.lengthOf(1);
        expect(result[0]).to.have.property("employee", "Jane Austen");
        expect(result[0]).to.have.property("report");
        expect(result[0]).to.have.property("timesheet");
      });
    });

    context("and there are several non-employees", () => {
      it("returns an empty report", () => {
        const employees: Employee[] = [
          {
            date: "2018-08-06",
            employee: false,
            hours: 5,
            name: "Jane Austen"
          },
          {
            date: "2018-08-07",
            employee: false,
            hours: 5,
            name: "Emily Bronte"
          }
        ];
        const result: ReportEmployee[] = report(REGULAR_DAY_HOURS)(employees);
        expect(result).to.be.empty;
      });
    });
  });
});
