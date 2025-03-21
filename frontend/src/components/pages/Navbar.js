import { Link } from "react-router-dom";
import React from "react";
import "../style/Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      {" "}
      {/* Apply the 'navbar' class */}
      <div className="nav-links">
        {" "}
        {/* Apply the 'nav-links' class */}
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
