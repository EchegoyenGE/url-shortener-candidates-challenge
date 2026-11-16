import { describe, expect, it, vi } from "vitest";

describe("GET /health", () => {
  it("returns 200 and a healthy status when the database is reachable", async () => {
    vi.resetModules();
    vi.doMock("@url-shortener/engine", () => ({
      isDatabaseHealthy: async () => true,
      prisma: {},
    }));
    const { loader } = await import("./health");

    const result = await loader();

    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({ status: "healthy" });
  });

  it("returns 503 and an unhealthy status when the database is unreachable, without throwing", async () => {
    vi.resetModules();
    vi.doMock("@url-shortener/engine", () => ({
      isDatabaseHealthy: async () => false,
      prisma: {},
    }));
    const { loader } = await import("./health");

    const result = await loader();

    expect(result.status).toBe(503);
    expect(await result.json()).toEqual({ status: "unhealthy" });
  });
});
