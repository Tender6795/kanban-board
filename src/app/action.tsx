"use server";
import { Procedure } from "@prisma/client";
import { User } from "./types";
import { getAllProcedures, getAllUsers, saveProcedure } from "./utils/prisma";

export async function getAllUsersFromServer() {
  return (await getAllUsers()) as User[];
}

//TODO
export async function createProcedure (procedureData:any){
  return await saveProcedure(procedureData)
}
export async function getAllProceduresFromServer() {
  return (await getAllProcedures()) as( Procedure & { assigned?: User | null })[];
}