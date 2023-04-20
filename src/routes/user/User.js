import React from "react";
import Navbar1 from "../../components/navbar/Navabar1";
import { Outlet } from "react-router";
const User = () => {
  return (
    <>
      <Navbar1 />
      <Outlet />
    </>
  );
};

export default User;
