import prisma from "./db";

export async function checkDbHealth() {
  await prisma.$queryRaw`SELECT 1`;
}
