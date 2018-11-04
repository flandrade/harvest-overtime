import { expect } from "chai";

import { Employee, Report, Timesheet } from "../../src/models";
import { getOvertime, getTimesheet } from "../../src/report/calculator";

describe("Reporter.Calculator", () => {
  describe(".getTimesheet", () => {
    context("when there is a date", () => {
      context("and is a weekday", () => {
        it("returns the timesheet", () => {
          const date: string = "2018-08-06";
          const employees: Employee[] = [{
            date,
            employee: true,
            hours: 5,
            name: "Jane Austen"
          }];
          const result: Timesheet = getTimesheet(date, employees);
          expect(result).to.have.property("date", date);
          expect(result).to.have.property("hours", 5);
          expect(result).to.have.property("isWeekend", false);
        });
      });

      context("and is a weekend", () => {
        it("returns the timesheet", () => {
          const date: string = "2018-08-11";
          const employees: Employee[] = [{
            date,
            employee: false,
            hours: 5,
            name: "Jane Austen"
          }];
          const result: Timesheet = getTimesheet(date, employees);
          expect(result).to.have.property("date", date);
          expect(result).to.have.property("hours", 5);
          expect(result).to.have.property("isWeekend", true);
        });
      });
    });
  });

  describe(".getOvertime", () => {
    context("when all dates are weedays", () => {
      context("and there is overtime", () => {
        it("returns the overtime", () => {
          const timesheet: Timesheet[] = [{
            date: "2018-08-06",
            hours: 9,
            isWeekend: false
          }, {
            date: "2018-08-09",
            hours: 10.5,
            isWeekend: false
          }];
          const result: Report = getOvertime(timesheet);
          expect(result).to.have.property("weekdays", 3.5);
          expect(result).to.have.property("weekends", 0);
        });
      });

      context("and there is no overtime", () => {
        it("returns zero", () => {
          const timesheet: Timesheet[] = [{
            date: "2018-08-06",
            hours: 8,
            isWeekend: false
          }, {
            date: "2018-08-08",
            hours: 8,
            isWeekend: false
          }];
          const result: Report = getOvertime(timesheet);
          expect(result).to.have.property("weekdays", 0);
          expect(result).to.have.property("weekends", 0);
        });
      });

      context("and there are less hours", () => {
        it("returns a negative overtime", () => {
          const timesheet: Timesheet[] = [{
            date: "2018-08-06",
            hours: 6,
            isWeekend: false
          }, {
            date: "2018-08-07",
            hours: 5.5,
            isWeekend: false
          }];
          const result: Report = getOvertime(timesheet);
          expect(result).to.have.property("weekdays", -4.5);
          expect(result).to.have.property("weekends", 0);
        });
      });
    });

    context("when all dates are weekends", () => {
      context("and there is overtime", () => {
        it("returns the overtime", () => {
          const timesheet: Timesheet[] = [{
            date: "2018-08-11",
            hours: 9,
            isWeekend: true
          }, {
            date: "2018-08-12",
            hours: 9,
            isWeekend: true
          }];
          const result: Report = getOvertime(timesheet);
          expect(result).to.have.property("weekdays", 0);
          expect(result).to.have.property("weekends", 18);
        });
      });

      context("and there is no overtime", () => {
        it("returns zero", () => {
          const timesheet: Timesheet[] = [{
            date: "2018-08-11",
            hours: 0,
            isWeekend: true
          }, {
            date: "2018-08-12",
            hours: 0,
            isWeekend: true
          }];
          const result: Report = getOvertime(timesheet);
          expect(result).to.have.property("weekdays", 0);
          expect(result).to.have.property("weekends", 0);
        });
      });
    });

    context("when dates are weedays and weekends", () => {
      describe("and there is overtime", () => {
        it("returns the overtime", () => {
          const timesheet: Timesheet[] = [{
            date: "2018-08-11",
            hours: 9,
            isWeekend: false
          }, {
            date: "2018-08-09",
            hours: 10.5,
            isWeekend: true
          }];
          const result: Report = getOvertime(timesheet);
          expect(result).to.have.property("weekdays", 1);
          expect(result).to.have.property("weekends", 10.5);
        });
      });

      context("and there is no overtime", () => {
        it("returns zero", () => {
          const timesheet: Timesheet[] = [{
            date: "2018-08-06",
            hours: 8,
            isWeekend: false
          }, {
            date: "2018-08-11",
            hours: 0,
            isWeekend: true
          }];
          const result: Report = getOvertime(timesheet);
          expect(result).to.have.property("weekdays", 0);
          expect(result).to.have.property("weekends", 0);
        });
      });

      context("and there are less hours", () => {
        it("returns a negative overtime", () => {
          const timesheet: Timesheet[] = [{
            date: "2018-08-06",
            hours: 6,
            isWeekend: false
          }, {
            date: "2018-08-11",
            hours: 0,
            isWeekend: true
          }];
          const result: Report = getOvertime(timesheet);
          expect(result).to.have.property("weekdays", -2);
          expect(result).to.have.property("weekends", 0);
        });
      });
    });
  });
});
