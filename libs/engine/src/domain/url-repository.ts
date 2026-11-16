import type { ShortUrl } from "./short-url";

export interface UrlRepository {
  save(shortUrl: ShortUrl): Promise<void>;
  findByCode(code: string): Promise<ShortUrl | null>;
  exists(code: string): Promise<boolean>;
  list(): Promise<ShortUrl[]>;
}
