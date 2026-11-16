import { isDatabaseHealthy, prisma } from "@url-shortener/engine";

export async function loader() {
  const healthy = await isDatabaseHealthy(prisma);

  return new Response(JSON.stringify({ status: healthy ? "healthy" : "unhealthy" }), {
    status: healthy ? 200 : 503,
    headers: { "Content-Type": "application/json" },
  });
}
