import type { ShortUrl } from "./short-url";

export interface UrlRepository {
  save(shortUrl: ShortUrl): Promise<void>;
  findByCode(code: string): Promise<ShortUrl | null>;
  list(): Promise<ShortUrl[]>;
}
