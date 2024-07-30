"use client"
import type { NextPage } from "next";
import AllCards from "./components/AllCards";
import { Procedure } from "@prisma/client";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { getAllProceduresFromServer } from "./action";



const Home: NextPage = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAllProceduresFromServer();
      setProcedures(res);
    })();
  }, []);

  const addProcedure = (procedure: Procedure) => {
    setProcedures((prev) => [...prev, procedure]);
  };

  return (
    <>
      <Header addProcedure={addProcedure}/>
      <AllCards procedures={procedures} />
    </>
  );
};

export default Home;
