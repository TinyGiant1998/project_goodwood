import { NavLink } from "react-router-dom";
import React from "react";
import "../style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src="/goodwood_logo1.png" alt="logo" />
          <div className="logo-text">Goodwood Community Centre</div>
        </div>

        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search..." />
        </div>

        <div className="language-selector">
          <select>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            {/* Add other languages here */}
          </select>
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/aboutUs">About Us</NavLink>
        <NavLink to="/whatWeDo">What We Do</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/communityEngagement">Community Engagement</NavLink>
        <NavLink to="/contactUs">Contact Us</NavLink>
        <NavLink to="/membershipDonation">Membership & Donation</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
