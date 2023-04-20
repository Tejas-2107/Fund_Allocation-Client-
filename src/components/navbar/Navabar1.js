import React from "react";
import { Link } from "react-router-dom";
import "./nav1.css";
import { Avatar, Typography } from "@mui/material";
const Navbar1 = () => {
  return (
    <div className="navbar1">
      <div className="left_content">
        <Typography variant="h2" >
          <Link to="/user" className="links" id="header">Fund Allocation</Link>
        </Typography>
      </div>
      <div className="right_content">
        <Link to="signup" className="links" >Signup</Link>
        <Link to="login" className="links" >Login</Link>
      </div>
    </div>
  );
}

export default Navbar1;
