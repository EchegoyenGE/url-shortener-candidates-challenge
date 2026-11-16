import type { UrlRepository } from "../domain/url-repository";
import { ShortUrl } from "../domain/short-url";

export class InMemoryUrlRepository implements UrlRepository {
  private readonly store = new Map<string, ShortUrl>();

  async save(shortUrl: ShortUrl): Promise<void> {
    this.store.set(shortUrl.code, shortUrl);
  }

  async findByCode(code: string): Promise<ShortUrl | null> {
    return this.store.get(code) ?? null;
  }

  async exists(code: string): Promise<boolean> {
    return this.store.has(code);
  }

  async list(): Promise<ShortUrl[]> {
    return [...this.store.values()];
  }
}
