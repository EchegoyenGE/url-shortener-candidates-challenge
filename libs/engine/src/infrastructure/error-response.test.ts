import { describe, expect, it } from "vitest";
import { toErrorResponse } from "./error-response";
import {
  CodeGenerationError,
  InvalidUrlError,
  ShortUrlNotFoundError,
} from "../domain/errors";

async function bodyOf(
  response: Response,
): Promise<{ error: { code: string; message: string } }> {
  return (await response.json()) as { error: { code: string; message: string } };
}

describe("toErrorResponse", () => {
  it("maps InvalidUrlError to 400", async () => {
    const response = toErrorResponse(new InvalidUrlError("URL is required"));

    expect(response.status).toBe(400);
    expect(await bodyOf(response)).toEqual({
      error: { code: "INVALID_URL", message: "URL is required" },
    });
  });

  it("maps ShortUrlNotFoundError to 404 with SHORT_URL_NOT_FOUND", async () => {
    const response = toErrorResponse(new ShortUrlNotFoundError("zz"));

    expect(response.status).toBe(404);
    const body = await bodyOf(response);
    expect(body.error.code).toBe("SHORT_URL_NOT_FOUND");
  });

  it("maps CodeGenerationError to 409", async () => {
    const response = toErrorResponse(new CodeGenerationError());

    expect(response.status).toBe(409);
    const body = await bodyOf(response);
    expect(body.error.code).toBe("CODE_GENERATION_CONFLICT");
  });

  it("maps unknown errors to 500 INTERNAL_ERROR without leaking internal details", async () => {
    const response = toErrorResponse(
      new Error("db connection string: postgres://user:pass@host/db"),
    );

    expect(response.status).toBe(500);
    const body = await bodyOf(response);
    expect(body).toEqual({
      error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred." },
    });
    expect(JSON.stringify(body)).not.toContain("postgres://");
    expect(JSON.stringify(body)).not.toContain("at ");
  });
});
