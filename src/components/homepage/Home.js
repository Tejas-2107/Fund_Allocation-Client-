import React from "react";
import { Link } from "react-router-dom";

import './home.css';
function Home() {
  
  return (
    <div className="home">
    <nav className="navbar">
        
        <Link to="/user">User</Link>
        <Link to="/admin">Admin</Link>
    </nav>
    </div>
  );
}

export default Home;
