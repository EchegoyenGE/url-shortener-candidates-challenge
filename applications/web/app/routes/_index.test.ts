import { describe, expect, it } from "vitest";
import { action } from "./_index";
import type { Route } from "./+types/_index";

function postRequest(fields: Record<string, string>) {
  const body = new URLSearchParams(fields);
  return new Request("http://localhost/", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

describe("POST /", () => {
  it("returns a shortened URL for a valid URL", async () => {
    const result = await action({
      request: postRequest({ url: "https://example.com" }),
    } as Route.ActionArgs);

    expect(result).toHaveProperty("shortenedUrl");
    expect(typeof (result as { shortenedUrl: string }).shortenedUrl).toBe(
      "string",
    );
  });

  it("returns the structured error-handling shape when URL is missing", async () => {
    const result = (await action({
      request: postRequest({}),
    } as Route.ActionArgs)) as Response;

    expect(result.status).toBe(400);
    const body = await result.json();
    expect(body).toEqual({
      error: { code: "INVALID_URL", message: "URL is required" },
    });
  });
});
