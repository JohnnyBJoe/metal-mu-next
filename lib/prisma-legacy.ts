import { PrismaClient as LegacyPrismaClient } from "../generated/legacy";

const globalForLegacy = globalThis as unknown as {
  legacy: LegacyPrismaClient | undefined;
};

export const legacy =
  globalForLegacy.legacy ??
  new LegacyPrismaClient({
    datasources: {
      db: {
        url: process.env.LEGACY_DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForLegacy.legacy = legacy;
}