import { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    }

    // Close the dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the dropdown if click is outside
      }
    };

    // Attach event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    setShowDropdown(false); // Close dropdown on logout
    navigate("/login"); // Redirect to login
  };

  const handleLinkClick = () => {
    setShowDropdown(false); // Close the dropdown when a link is clicked
  };

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
                    {role === "admin" && (
                      <NavLink to="/user" onClick={handleLinkClick}>
                        Profile
                      </NavLink>
                    )}
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
