import { useEffect, useState, useRef } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleStorageChange = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
  };

  useEffect(() => {
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    setShowDropdown(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const handleLinkClick = () => {
    setShowDropdown(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          </select>
        </div>

        {/* Hamburger Menu Button */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>

      {/* Navbar Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={handleLinkClick}>
          Home
        </NavLink>
        <NavLink to="/aboutUs" onClick={handleLinkClick}>
          About Us
        </NavLink>
        <NavLink to="/whatWeDo" onClick={handleLinkClick}>
          What We Do
        </NavLink>
        <NavLink to="/events" onClick={handleLinkClick}>
          Events
        </NavLink>
        <NavLink to="/gallery" onClick={handleLinkClick}>
          Gallery
        </NavLink>
        <NavLink to="/communityEngagement" onClick={handleLinkClick}>
          Community Engagement
        </NavLink>
        <NavLink to="/contactUs" onClick={handleLinkClick}>
          Contact Us
        </NavLink>
        <NavLink to="/membershipDonation" onClick={handleLinkClick}>
          Membership & Donation
        </NavLink>

        {/* Profile Dropdown */}
        <div className="profile-menu">
          <div className="dropdown" ref={dropdownRef}>
            <FaUserCircle
              size={35}
              className="profile-icon"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown-content">
                {isAuthenticated ? (
                  <>
                    <NavLink to="/user" onClick={handleLinkClick}>
                      Profile
                    </NavLink>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" onClick={handleLinkClick}>
                      Login
                    </NavLink>
                    <NavLink to="/signup" onClick={handleLinkClick}>
                      Signup
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
