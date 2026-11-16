import { describe, expect, it } from "vitest";
import { RandomCodeGenerator } from "./random-code-generator";

describe("RandomCodeGenerator", () => {
  it("generates a 2-character code using the current a/b/c alphabet", () => {
    const generator = new RandomCodeGenerator();

    const code = generator.generate();

    expect(code).toMatch(/^[abc]{2}$/);
  });
});
