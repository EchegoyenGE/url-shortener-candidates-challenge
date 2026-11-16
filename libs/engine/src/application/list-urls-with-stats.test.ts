import { describe, expect, it } from "vitest";
import { ListUrlsWithStats } from "./list-urls-with-stats";
import { InMemoryUrlRepository } from "../infrastructure/in-memory-url-repository";
import { ShortUrl } from "../domain/short-url";

describe("ListUrlsWithStats", () => {
  it("returns an empty list when no URLs have been shortened", async () => {
    const repository = new InMemoryUrlRepository();
    const useCase = new ListUrlsWithStats(repository);

    expect(await useCase.execute()).toEqual([]);
  });

  it("returns all saved ShortUrls with their stats", async () => {
    const repository = new InMemoryUrlRepository();
    const shortUrl = new ShortUrl({ code: "ab", originalUrl: "https://example.com" });
    shortUrl.recordClick();
    await repository.save(shortUrl);
    const useCase = new ListUrlsWithStats(repository);

    const result = await useCase.execute();

    expect(result).toEqual([shortUrl]);
    expect(result[0].clickCount).toBe(1);
  });
});
