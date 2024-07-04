import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  var prisma: PrismaClient | undefined;
}

// Extending PrismaClient with the accelerate extension
const extendedPrismaClient = new PrismaClient().$extends(
  withAccelerate()
) as unknown as PrismaClient;

// Ensure the type of `db` is PrismaClient, which includes the extended methods
export const db = globalThis.prisma || extendedPrismaClient;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
