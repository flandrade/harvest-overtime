import { expect } from "chai";

import { Employee } from "../../src/models";
import parse from "../../src/parser/parser-from-csv";

describe("Parser.ParserFromCsv", () => {
  describe("#date", () => {
    describe("when field is valid", () => {
      it("parses the value", () => {
        const csv = `Employee?,First Name,Last Name,Date,Hours\nYes,Jane,Austen,2018-08-06,8`;
        const parsed: Employee = parse(csv)[0];
        expect(parsed).to.have.property("date", "2018-08-06");
      });
    });

    describe("when field is not valid", () => {
      describe("when field is incorrect", () => {
        it("parses the value", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nMmm,Jane,Austen,Persuasion,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("date", "Persuasion");
        });
      });

      describe("when field is empty", () => {
        it("parses to empty", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nYes,Jane,Austen,,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("date").be.empty;
        });
      });
    });
  });

  describe("#employee", () => {
    describe("when field is valid", () => {
      describe("and field is 'Yes'", () => {
        it("parses to true", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nYes,Jane,Austen,2018-08-06,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("employee").be.true;
        });
      });

      describe("and field is 'No'", () => {
        it("parses to false", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nNo,Jane,Austen,2018-08-06,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("employee").be.false;
        });
      });
    });

    describe("when field is not valid", () => {
      describe("and field is different than 'Yes'", () => {
        it("parses to false", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nMmm,Jane,Austen,2018-08-06,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("employee").be.false;
        });
      });

      describe("and field is empty", () => {
        it("parses to false", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\n,Jane,Austen,2018-08-06,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("employee").be.false;
        });
      });
    });
  });

  describe("#hours", () => {
    describe("when field is valid", () => {
      describe("and field is a number", () => {
        it("parses to a number", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nYes,Jane,Austen,2018-08-06,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("hours", 8);
        });
      });
    });

    describe("when field is not valid", () => {
      describe("and field is not a number", () => {
        it("parses to zero", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nNo,Jane,Austen,2018-08-06,Mmm`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("hours", 0);
        });
      });

      describe("and field is empty", () => {
        it("parses to zero", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nNo,Jane,Austen,2018-08-06,`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("hours", 0);
        });
      });
    });
  });

  describe("#name", () => {
    describe("when fields are valid", () => {
      it("parses the value", () => {
        const csv = `Employee?,First Name,Last Name,Date,Hours\nYes,Jane,Austen,2018-08-06,8`;
        const parsed: Employee = parse(csv)[0];
        expect(parsed).to.have.property("name", "Jane Austen");
      });
    });

    describe("when field are not valid", () => {
      describe("when field is incorrect", () => {
        it("parses the value", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nMmm,Persuasion,Austen,2018-08-06,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("name", "Persuasion Austen");
        });
      });

      describe("when some fields are empty", () => {
        it("parses to empty", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nYes,,Austen,2018-08-06,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("name", "Austen");
        });
      });

      describe("when fields are empty", () => {
        it("parses to empty", () => {
          const csv = `Employee?,First Name,Last Name,Date,Hours\nYes,,,2018-08-06,8`;
          const parsed: Employee = parse(csv)[0];
          expect(parsed).to.have.property("name").be.empty;
        });
      });
    });
  });
});
