import { describe, expect, it } from "vitest";
import { shortenerApp } from "@url-shortener/engine";
import { loader } from "./s.$code";
import type { Route } from "./+types/s.$code";

describe("GET /s/:code", () => {
  it("redirects to the stored URL for a known code", async () => {
    const shortUrl = await shortenerApp.shortenUrl.execute(
      "https://example.com",
    );

    const result = (await loader({
      params: { code: shortUrl.code },
    } as Route.LoaderArgs)) as Response;

    expect(result.status).toBe(302);
    expect(result.headers.get("Location")).toBe("https://example.com");
  });

  it("returns 404 for an unknown code", async () => {
    await expect(
      loader({ params: { code: "does-not-exist" } } as Route.LoaderArgs),
    ).rejects.toMatchObject({ status: 404 });
  });
});
