import React from "react";
import { Procedure, User } from "@prisma/client";
import Card from "./Card";

type AllCardsProps = {
    procedures: Procedure[];
  };

const AllCards = async ({ procedures }: AllCardsProps) => {
  if (!procedures || procedures.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl">
        No procedures found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {procedures.map((procedure: Procedure) => (
        <Card key={procedure.id} procedure={procedure} />
      ))}
    </div>
  );
};

export default AllCards;
