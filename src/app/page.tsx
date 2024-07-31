"use client"
import type { NextPage } from "next";
import AllCards from "./components/AllCards";
import { Procedure } from "@prisma/client";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { getAllProceduresFromServer } from "./action";
import { ProcedureWithUser } from "./types";



const Home: NextPage = () => {
  const [procedures, setProcedures] = useState<ProcedureWithUser[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAllProceduresFromServer();
      setProcedures(res);
    })();
  }, []);

  const addProcedure = (procedure: ProcedureWithUser) => {
    setProcedures((prev) => [...prev, procedure]);
  };

  return (
    <div className="max-w-[1370px] mx-auto px-4">
    <Header addProcedure={addProcedure} />
    <AllCards procedures={procedures} />
  </div>
  );
};

export default Home;
