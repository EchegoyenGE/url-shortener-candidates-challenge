export { baseUrl } from "./infrastructure/config";

export { shortenerApp } from "./composition-root";
export { toErrorResponse } from "./infrastructure/error-response";
export { prisma } from "./infrastructure/prisma-client";
export { isDatabaseHealthy } from "./infrastructure/health-check";
