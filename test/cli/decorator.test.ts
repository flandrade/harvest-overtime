import { expect } from "chai";

import { decorateArgs, Files } from "../../src/cli/decorator";

describe("Cli.Decorator", () => {
  describe("#inputPath", () => {
    context("and input is not defined", () => {
      it("returns the default", () => {
        const defaultInput: string = "test.csv";
        const result: Files = decorateArgs(
          { default: defaultInput, file: null },
          { default: defaultInput, file: null }
          )
        expect(result.inputPath).to.contain(defaultInput);
      });
    });

    context("and input is defined", () => {
      it("returns the input", () => {
        const defaultInput: string = "test.csv";
        const input: string = "test2.csv";
        const result: Files = decorateArgs(
          { default: defaultInput, file: input },
          { default: defaultInput, file: null }
          )
        expect(result.inputPath).to.contain(input);
        expect(result.inputPath).to.not.contain(defaultInput);
      });
    });
  });

  describe("#outputPath", () => {
    context("and output is not defined", () => {
      it("returns the default", () => {
        const defaultOutput: string = "test.csv";
        const result: Files = decorateArgs(
          { default: defaultOutput, file: null },
          { default: defaultOutput, file: null }
          )
        expect(result.outputPath).to.contain(defaultOutput);
      });
    });

    context("and output is defined", () => {
      it("returns the output", () => {
        const defaultOutput: string = "test.csv";
        const output: string = "test2.csv";
        const result: Files = decorateArgs(
          { default: defaultOutput, file: null },
          { default: defaultOutput, file: output },
          )
        expect(result.outputPath).to.contain(output);
        expect(result.outputPath).to.not.contain(defaultOutput);
      });
    });
  });
});
