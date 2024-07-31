"use server";
import { Procedure } from "@prisma/client";
import { ProcedureWithUser, User } from "./types";
import { getAllProcedures, getAllUsers, saveProcedure } from "./utils/prisma";

export async function getAllUsersFromServer() {
  return (await getAllUsers()) as User[];
}

//TODO
export async function createProcedure (procedureData:any){
  return await saveProcedure(procedureData) as ProcedureWithUser
}
export async function getAllProceduresFromServer() {
  return (await getAllProcedures()) as ProcedureWithUser[];
}