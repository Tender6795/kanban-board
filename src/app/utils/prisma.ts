import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllProcedures() {
  return await prisma.procedure.findMany({
    include: {
        assigned: true,
    },
  });
}
