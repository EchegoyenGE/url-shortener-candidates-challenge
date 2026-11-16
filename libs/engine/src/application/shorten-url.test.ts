import { describe, expect, it } from "vitest";
import { ShortenUrl } from "./shorten-url";
import { InMemoryUrlRepository } from "../infrastructure/in-memory-url-repository";
import type { CodeGenerator } from "../domain/code-generator";

class FixedCodeGenerator implements CodeGenerator {
  constructor(private readonly code: string) {}
  generate(): string {
    return this.code;
  }
}

describe("ShortenUrl", () => {
  it("saves and returns a new ShortUrl on the success path", async () => {
    const repository = new InMemoryUrlRepository();
    const useCase = new ShortenUrl(repository, new FixedCodeGenerator("ab"));

    const shortUrl = await useCase.execute("https://example.com");

    expect(shortUrl.code).toBe("ab");
    expect(shortUrl.originalUrl).toBe("https://example.com");
    expect(await repository.findByCode("ab")).toBe(shortUrl);
  });
});
