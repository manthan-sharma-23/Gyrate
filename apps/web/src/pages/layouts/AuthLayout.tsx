import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-[#0f1119] text-white h-screen w-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
