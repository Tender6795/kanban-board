"use server";
import { User } from "./types";
import { getAllUsers } from "./utils/prisma";

export async function getAllUsersFromServer() {
  return (await getAllUsers()) as User[];
}
