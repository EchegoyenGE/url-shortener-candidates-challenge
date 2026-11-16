import { Prisma, type PrismaClient, type ShortUrl as ShortUrlRecord } from "@prisma/client";
import { DuplicateCodeError } from "../domain/errors";
import { ShortUrl } from "../domain/short-url";
import type { UrlRepository } from "../domain/url-repository";

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

function toDomain(record: ShortUrlRecord): ShortUrl {
  return new ShortUrl({
    code: record.code,
    originalUrl: record.originalUrl,
    createdAt: record.createdAt,
    clickCount: record.clicks,
  });
}

export class PrismaUrlRepository implements UrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(shortUrl: ShortUrl): Promise<void> {
    const { count } = await this.prisma.shortUrl.updateMany({
      where: { code: shortUrl.code, originalUrl: shortUrl.originalUrl },
      data: { clicks: shortUrl.clickCount },
    });

    if (count > 0) {
      return;
    }

    try {
      await this.prisma.shortUrl.create({
        data: {
          code: shortUrl.code,
          originalUrl: shortUrl.originalUrl,
          clicks: shortUrl.clickCount,
          createdAt: shortUrl.createdAt,
        },
      });
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new DuplicateCodeError(shortUrl.code);
      }
      throw error;
    }
  }

  async findByCode(code: string): Promise<ShortUrl | null> {
    const record = await this.prisma.shortUrl.findUnique({ where: { code } });
    return record ? toDomain(record) : null;
  }

  async exists(code: string): Promise<boolean> {
    const count = await this.prisma.shortUrl.count({ where: { code } });
    return count > 0;
  }

  async list(): Promise<ShortUrl[]> {
    const records = await this.prisma.shortUrl.findMany({
      orderBy: { createdAt: "asc" },
    });
    return records.map(toDomain);
  }
}
