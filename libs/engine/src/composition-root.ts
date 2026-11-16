import { ListUrlsWithStats } from "./application/list-urls-with-stats";
import { ResolveAndTrackClick } from "./application/resolve-and-track-click";
import { ShortenUrl } from "./application/shorten-url";
import { InMemoryUrlRepository } from "./infrastructure/in-memory-url-repository";
import { RandomCodeGenerator } from "./infrastructure/random-code-generator";

export function createShortenerApp() {
  const urlRepository = new InMemoryUrlRepository();
  const codeGenerator = new RandomCodeGenerator();

  return {
    shortenUrl: new ShortenUrl(urlRepository, codeGenerator),
    resolveAndTrackClick: new ResolveAndTrackClick(urlRepository),
    listUrlsWithStats: new ListUrlsWithStats(urlRepository),
  };
}

export const shortenerApp = createShortenerApp();
