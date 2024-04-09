import { cn } from "@/lib/utils";
import { sideIcons } from "@/utils/helpers/nav-items";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Global = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-full h-full flex">
      <div className="w-[15vw] h-full p-2">
        <p className="font-kode-mono text-2xl my-3 pl-2 font-medium">GLOBAL</p>
        <div className="w-full p-2 flex flex-col">
          {sideIcons.map((item) => (
            <Link
              to={item.href}
              className={cn(
                "flex justify-start items-center gap-2 text-sm text-white/70 mb-2 hover:bg-white/5 px-3 py-1 rounded-md",
                pathname.startsWith(item.href) && "bg-white/5"
              )}
            >
              <item.icon className="p-[2px]" />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-[80vw] h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Global;
