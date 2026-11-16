import type { ShortUrl } from "../domain/short-url";
import type { UrlRepository } from "../domain/url-repository";

export class ListUrlsWithStats {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(): Promise<ShortUrl[]> {
    return this.urlRepository.list();
  }
}
