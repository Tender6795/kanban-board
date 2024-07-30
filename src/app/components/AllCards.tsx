import React from "react";
import { Procedure } from "@prisma/client";
import Card from "./Card";
import { statuses } from "../constants";
import { colorByStatus } from "../helpers";

type AllCardsProps = {
  procedures: Procedure[];
};

const Column = ({ status, procedures }: { status: string, procedures: Procedure[] }) => {
  const color = colorByStatus(status);

  return (
    <div className="flex flex-col items-start p-4">
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }}></div>
        <h2
          className="font-satoshi text-[14px] font-bold leading-[22px] text-[#1C274C] text-center"
        >
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </h2>
        <span
          className="ml-2 text-[14px] font-bold leading-[22px] text-[#1C274C] text-center"
        >
          ({procedures.length})
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {procedures.map((procedure: Procedure) => (
          <Card key={procedure.id} procedure={procedure} />
        ))}
      </div>
    </div>
  );
};

const AllCards = ({ procedures }: AllCardsProps) => {
  const getProceduresByStatus = (status: string) => {
    return procedures.filter(procedure => procedure.status === status);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {statuses.map(status => (
        <Column key={status} status={status} procedures={getProceduresByStatus(status)} />
      ))}
    </div>
  );
};

export default AllCards;
