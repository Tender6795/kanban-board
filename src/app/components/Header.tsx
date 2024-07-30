import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <h1 className="font-satoshi text-[24px] font-extrabold leading-[30px] tracking-[-0.3px] text-[#1C274C]">
          Projet champion 💪
        </h1>
        <nav className="mt-2">
          <span className="font-inter text-[14px] font-normal leading-[24px] tracking-[-0.14px] text-[#64748B]">
            Home/Projects/ Projet champion 💪
          </span>
        </nav>
      </div>
      <button className="flex items-center gap-2 bg-[#635BFF] text-white rounded-[8px_0px_0px_0px] py-[10px] px-[12px] opacity-100">
        <Image
          src="/icons/Add_square.svg"
          alt="Create Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="font-satoshiVariable text-[16px] font-extrabold leading-[24px] tracking-[-0.2px] text-white">
          Create a new procedure
        </span>
      </button>
    </header>
  );
};

export default Header;
