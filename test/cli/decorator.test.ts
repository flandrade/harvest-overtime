import { expect } from "chai";

import { decorateArgs, Options } from "../../src/cli/decorator";

describe("Cli.Decorator", () => {
  describe("#inputPath", () => {
    context("and input is not defined", () => {
      it("returns the default", () => {
        const defaultInput: string = "test.csv";
        const result: Options = decorateArgs(
          { default: defaultInput, option: null },
          { default: defaultInput, option: null },
          { default: defaultInput, option: null }
        );
        expect(result.inputPath).to.contain(defaultInput);
      });
    });

    context("and input is defined", () => {
      it("returns the input", () => {
        const defaultInput: string = "test.csv";
        const input: string = "test2.csv";
        const result: Options = decorateArgs(
          { default: defaultInput, option: input },
          { default: defaultInput, option: null },
          { default: defaultInput, option: null }
        );
        expect(result.inputPath).to.contain(input);
        expect(result.inputPath).to.not.contain(defaultInput);
      });
    });
  });

  describe("#outputPath", () => {
    context("and output is not defined", () => {
      it("returns the default", () => {
        const defaultOutput: string = "test.csv";
        const result: Options = decorateArgs(
          { default: defaultOutput, option: null },
          { default: defaultOutput, option: null },
          { default: defaultOutput, option: null }
        );
        expect(result.outputPath).to.contain(defaultOutput);
      });
    });

    context("and output is defined", () => {
      it("returns the output", () => {
        const defaultOutput: string = "test.csv";
        const output: string = "test2.csv";
        const result: Options = decorateArgs(
          { default: defaultOutput, option: null },
          { default: defaultOutput, option: output },
          { default: defaultOutput, option: null }
        );
        expect(result.outputPath).to.contain(output);
        expect(result.outputPath).to.not.contain(defaultOutput);
      });
    });
  });

  describe("#regularDayHours", () => {
    context("and the number of hours is not defined", () => {
      it("returns the default", () => {
        const defaultRDayHours: string = "8";
        const result: Options = decorateArgs(
          { default: defaultRDayHours, option: null },
          { default: defaultRDayHours, option: null },
          { default: defaultRDayHours, option: null }
        );
        expect(result.regularDayHours).to.be.eql(parseInt(defaultRDayHours));
      });
    });

    context("and the number of hours is defined", () => {
      context("and is a correct value", () => {
        context("and is other than 0", () => {
          it("returns the value", () => {
            const defaultRDayHours: string = "8";
            const hours: string = "7";
            const result: Options = decorateArgs(
              { default: defaultRDayHours, option: null },
              { default: defaultRDayHours, option: null },
              { default: defaultRDayHours, option: hours }
            );
            expect(result.regularDayHours).to.be.eql(parseInt(hours));
            expect(result.regularDayHours).to.not.be.eql(
              parseInt(defaultRDayHours)
            );
          });
        });

        context("and is 0", () => {
          it("returns the value", () => {
            const defaultRDayHours: string = "8";
            const hours: string = "0";
            const result: Options = decorateArgs(
              { default: defaultRDayHours, option: null },
              { default: defaultRDayHours, option: null },
              { default: defaultRDayHours, option: hours }
            );
            expect(result.regularDayHours).to.be.eql(parseInt(hours));
            expect(result.regularDayHours).to.not.be.eql(
              parseInt(defaultRDayHours)
            );
          });
        });
      });

      context("and is an incorrect value", () => {
        it("returns the default", () => {
          const defaultRDayHours: string = "8";
          const hours: string = "er8";
          const result: Options = decorateArgs(
            { default: defaultRDayHours, option: null },
            { default: defaultRDayHours, option: null },
            { default: defaultRDayHours, option: hours }
          );
          expect(result.regularDayHours).to.be.eql(parseInt(defaultRDayHours));
        });
      });
    });
  });
});
