import type { CodeGenerator } from "../domain/code-generator";

const ALPHABET = "abc";
const CODE_LENGTH = 2;

export class RandomCodeGenerator implements CodeGenerator {
  generate(): string {
    let code = "";
    for (let i = 0; i < CODE_LENGTH; i++) {
      code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    return code;
  }
}
