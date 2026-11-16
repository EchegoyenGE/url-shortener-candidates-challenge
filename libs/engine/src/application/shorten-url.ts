import type { CodeGenerator } from "../domain/code-generator";
import { ShortUrl } from "../domain/short-url";
import type { UrlRepository } from "../domain/url-repository";

export class ShortenUrl {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly codeGenerator: CodeGenerator,
  ) {}

  async execute(originalUrl: string): Promise<ShortUrl> {
    const shortUrl = new ShortUrl({
      code: this.codeGenerator.generate(),
      originalUrl,
    });

    await this.urlRepository.save(shortUrl);

    return shortUrl;
  }
}
