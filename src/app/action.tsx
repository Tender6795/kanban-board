"use server";
import { User } from "./types";
import { getAllUsers, saveProcedure } from "./utils/prisma";

export async function getAllUsersFromServer() {
  return (await getAllUsers()) as User[];
}

//TODO
export async function createProcedure (procedureData:any){
  return await saveProcedure(procedureData)
}