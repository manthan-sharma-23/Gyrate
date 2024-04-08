import { sideIcons } from "@/utils/helpers/nav-items";
import React from "react";
import { Link } from "react-router-dom";

const Global = () => {
  return (
    <div className="w-full h-full">
      <div className="w-[15vw] h-full p-2">
        <p className="font-kode-mono text-2xl my-3 pl-2">GLOBAL</p>
        <div className="w-full p-2 flex flex-col">
          {sideIcons.map((item) => (
            <Link
              to={item.href}
              className="flex justify-start items-center gap-2 text-sm text-white/70 mb-2 hover:bg-white/5 px-3 py-1 rounded-md"
            >
              <item.icon className="p-[2px]" />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Global;
