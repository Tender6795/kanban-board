import type { NextPage } from "next";
import AllCards from "./components/AllCards";
import { Procedure } from "@prisma/client";
import { getAllProcedures } from "./utils/prisma";

export async function getAllProceduresFromServer() {
  "use server";
  return (await getAllProcedures()) as Procedure[];
}

const Home: NextPage = async () => {
  const procedures = await getAllProceduresFromServer();
  return <AllCards procedures={procedures} />;
};

export default Home;
