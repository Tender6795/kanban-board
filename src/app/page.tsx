import type { NextPage } from "next";
import AllCards from "./components/AllCards";
import { Procedure, User } from "@prisma/client";
import { getAllProcedures } from "./utils/prisma";
import { useEffect, useState } from "react";


export async function getAllProceduresFromServer() {
  "use server";
  const procedures = await getAllProcedures();
  return procedures.map((procedure) => ({
    ...procedure,
    assigned: procedure.assigned ?? null,
  })) as Procedure[];
}

const Home: NextPage = async() => {
  const procedures =await getAllProceduresFromServer()
  return <AllCards procedures={procedures} />;
};

export default Home;
