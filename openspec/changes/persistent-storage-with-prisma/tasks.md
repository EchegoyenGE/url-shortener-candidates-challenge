# Tasks

## 1. Prisma schema and configuration

- [ ] 1.1 Add `prisma/schema.prisma` with the `ShortUrl` model (`id`, `code` unique, `originalUrl`, `clicks Int @default(0)`, `createdAt`) and verify `prisma validate` succeeds
- [ ] 1.2 Generate the initial migration against a local Postgres instance and verify it applies cleanly to a fresh database
- [ ] 1.3 Add `DATABASE_URL` to `.env.example` and verify the app and Prisma client read it only from `process.env`, with no hardcoded connection string anywhere in source

## 2. PrismaUrlRepository

- [ ] 2.1 Implement `PrismaUrlRepository` fulfilling `UrlRepository` (save, findByCode, exists, list) and verify integration tests cover a save-then-findByCode round trip against a test database
- [ ] 2.2 Map a Prisma unique-constraint violation on `code` to the collision signal the `shortenUrl` retry loop expects, and verify a test simulates a constraint violation and confirms the use case retries instead of crashing
- [ ] 2.3 Wire `PrismaUrlRepository` into `composition-root.ts` for the running app, keeping `InMemoryUrlRepository` for fast unit tests, and verify `pnpm typecheck` passes

## 3. Docker and automatic migrations

- [ ] 3.1 Add a `db` service (PostgreSQL) to `docker-compose.yml` with a named volume for its data directory and a `pg_isready` healthcheck, and verify `docker compose up --build` reports `db` as healthy
- [ ] 3.2 Update the `Dockerfile` to run `prisma generate` during the build stage and ensure the generated client ships in the production image, and verify the production image starts without a "Prisma Client not generated" error
- [ ] 3.3 Run `prisma migrate deploy` automatically before the app starts, with `web` depending on `db`'s healthy state, and verify a fresh `docker compose up --build` creates the schema with no manual step
- [ ] 3.4 Restart the `web` container without removing the volume after shortening a URL, and verify the same short code still resolves afterward

## 4. Health endpoint

- [ ] 4.1 Add `GET /health` performing a lightweight DB query and returning 200 when it succeeds, and verify a test covers the healthy path
- [ ] 4.2 Verify a test covers `GET /health` returning 503 (without hanging or crashing the process) when the database is unreachable

## 5. End-to-end verification

- [ ] 5.1 Run the full test suite and `docker compose up --build`, and verify shortening a URL, redirecting through it, and resolving it again after a container restart all work end to end
