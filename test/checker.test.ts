import { expect } from 'chai';

import check from '../src/checker';
import { Employee, Report } from "../src/models"

describe("Check", () => {
  describe("when there is an element", () => {
    describe("and is an employee", () => {
      it("returns the report", () => {
        const employees: Employee[] = [{
          date: "2018-08-06",
          employee: true,
          firstName: "Jane",
          hours: 5,
          lastName: "Austen"
        }];
        const report: Report = check(employees)[0];
        expect(report["Jane"][0]).to.have.property("2018-08-06", 5);
      });
    });

    describe("and is not an employee", () => {
      it("returns an empty report", () => {
        const employees: Employee[] = [{
          date: "2018-08-06",
          employee: false,
          firstName: "Jane",
          hours: 5,
          lastName: "Austen"
        }];
        const report: Report[] = check(employees)
        expect(report).to.be.empty;
      });
    });
  });

  describe("when there are several elements", () => {
    describe("and there are several employees", () => {
      describe("and there is a single entry for each one", () => {
        it("returns the report", () => {
          const employees: Employee[] = [{
            date: "2018-08-06",
            employee: true,
            firstName: "Jane",
            hours: 5,
            lastName: "Austen"
          }, {
            date: "2018-08-07",
            employee: true,
            firstName: "Emily",
            hours: 8,
            lastName: "Bronte"
          }];
          const report: Report[] = check(employees);
          expect(report[0]["Jane"][0]).to.have.property("2018-08-06", 5);
          expect(report[1]["Emily"][0]).to.have.property("2018-08-07", 8);
        });
      });

      describe("and there are several entries for each one", () => {
        it("returns the report", () => {
          const employees: Employee[] = [{
            date: "2018-08-06",
            employee: true,
            firstName: "Jane",
            hours: 5,
            lastName: "Austen"
          }, {
            date: "2018-08-07",
            employee: true,
            firstName: "Emily",
            hours: 8,
            lastName: "Bronte"
          },
          {
            date: "2018-08-06",
            employee: true,
            firstName: "Jane",
            hours: 2,
            lastName: "Austen"
          }, {
            date: "2018-08-07",
            employee: true,
            firstName: "Emily",
            hours: 1,
            lastName: "Bronte"
          }
        ];
          const report: Report[] = check(employees);
          expect(report[0]["Jane"][0]).to.have.property("2018-08-06", 7);
          expect(report[1]["Emily"][0]).to.have.property("2018-08-07", 9);
        });
      });
    });

    describe("and there are several employees and non-employee", () => {
      it("returns the report without non-employees", () => {
        const employees: Employee[] = [{
          date: "2018-08-06",
          employee: true,
          firstName: "Jane",
          hours: 5,
          lastName: "Austen"
        }, {
          date: "2018-08-07",
          employee: false,
          firstName: "Emily",
          hours: 8,
          lastName: "Bronte"
        }];
        const report: Report[] = check(employees);
        expect(report[0]["Jane"][0]).to.have.property("2018-08-06", 5);
        expect(report).lengthOf(1);
      });
    });

    describe("and there are several non-employees", () => {
      it("returns an empty report", () => {
        const employees: Employee[] = [{
          date: "2018-08-06",
          employee: false,
          firstName: "Jane",
          hours: 5,
          lastName: "Austen"
        }, {
          date: "2018-08-07",
          employee: false,
          firstName: "Emily",
          hours: 5,
          lastName: "Bronte"
        }];
        const report: Report[] = check(employees);
        expect(report).to.be.empty;
      });
    });
  });
});
