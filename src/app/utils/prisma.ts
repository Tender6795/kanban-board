import { PrismaClient, TYPE_PRIORITY, TYPE_CATEGORY, TYPE_STATUS } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllProcedures() {
  try {
    return await prisma.procedure.findMany({
      include: {
        assigned: true,
      },
    });
  } catch (error) {
    console.error("Error fetching procedures:", error);
    throw new Error("Failed to fetch procedures");
  }
}

export async function getAllUsers() {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function saveProcedure(procedureData: {
  description: string;
  importance: TYPE_PRIORITY; 
  status: TYPE_STATUS;
  assignedId: string;
  category: TYPE_CATEGORY; 
}) {
  try {
    const newProcedure = await prisma.procedure.create({
      data: {
        description: procedureData.description,
        importance: procedureData.importance, 
        status: procedureData.status,
        assignedId: procedureData.assignedId,
        category: procedureData.category,
      },
      include: {
        assigned: true,
      },
    });
    return newProcedure;
  } catch (error) {
    console.error("Error saving procedure:", error);
    throw new Error("Failed to save procedure");
  }
}
