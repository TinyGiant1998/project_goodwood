import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import User Icon
import "../style/UserProfile.css"; // Import CSS

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (!storedUsername || !storedEmail) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!username || !email) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />
        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
