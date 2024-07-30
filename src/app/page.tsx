import type { NextPage } from "next";
import AllCards from "./components/AllCards";
import { Procedure } from "@prisma/client";
import { getAllProcedures } from "./utils/prisma";
import Header from "./components/Header";

export async function getAllProceduresFromServer() {
  "use server";
  return (await getAllProcedures()) as Procedure[];
}

const Home: NextPage = async () => {
  const procedures = await getAllProceduresFromServer();
  return (
    <> 
      <Header />
      <AllCards procedures={procedures} />
    </>
  );
};

export default Home;
