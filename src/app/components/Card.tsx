import React from "react";
import Image from "next/image";
import { Procedure, User } from "@prisma/client";
import { getIconByPriority } from "../helpers";

type CardProps = {
  procedure: Procedure & { assigned?: User | null };
};

const Card: React.FC<CardProps> = ({ procedure }) => {
  return (
    <div className="w-[300px] h-[185px] p-5 rounded-lg bg-white flex flex-col items-start gap-2 relative">
      <div className="flex gap-2">
        <div className="w-[56px] h-[16px] p-[2px_10px] rounded-[10px]">
        <Image
          src={getIconByPriority(procedure.importance)}
          alt="Status"
          width={56}
          height={16}
          className="w-[56px] h-[16px]"
        />
        </div>
        <div className="w-[55px] h-[16px] px-[10px] flex items-center border-[0.5px] border-[#D1D5DB] rounded-[10px] text-[#64748B] font-inter text-[10px] font-normal leading-[16px] tracking-[-0.1px] text-left">
          Réseau
        </div>
      </div>
      <p className="font-satoshi text-[16px] font-extrabold leading-[24px] tracking-[-0.2px] text-left text-[#64748B]">
        {procedure.description}
      </p>
      {procedure.assigned && (
        <div className="flex items-center gap-2 mt-2">
          <img
            src={procedure.assigned.avatar_url || "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png"}
            alt="Avatar"
            className="w-6 h-6 rounded-full"
          />
          <span className="font-inter text-[12px] font-medium leading-[20px] tracking-[-0.12px] text-left text-[#1C274C]">
            {procedure.assigned.firstName} {procedure.assigned.lastName}
          </span>
        </div>
      )}
      <div
        className="w-[260px] border-t border-[#D1D5DB] mt-2"
        style={{ transform: "rotate(-0.23deg)" }}
      ></div>
      <div className="absolute bottom-5 left-5 flex items-center gap-1">
        <Image
          src="/icons/Dua_date_low.svg" 
          alt="Due Date Icon"
          width={30}
          height={30}
          className="w-3 h-3"
        />
        <span className="font-inter text-[12px] font-medium text-[#1C274C]">
          Due date: {new Date(procedure.dueDate).toLocaleDateString()}
        </span>
      </div>
      <div className="absolute bottom-5 right-5 flex items-center gap-1">
        <Image
          src="/icons/NotificationIcon.svg" 
          alt="Notification Icon"
          width={35}
          height={35}
          className="w-3.5 h-3.5"
        />
        <span className="font-inter text-[14px] font-medium text-[#1C274C]">
          1
        </span>
      </div>
    </div>
  );
};

export default Card;
