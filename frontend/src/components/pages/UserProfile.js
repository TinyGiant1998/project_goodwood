import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import User Icon
import "../style/UserProfile.css"; // Import CSS

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");

    console.log("Retrieved from localStorage:");
    console.log("Username:", storedUsername);
    console.log("Email:", storedEmail);
    console.log("First Name:", storedFirstName);
    console.log("Last Name:", storedLastName);

    if (!storedUsername || !storedEmail) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
      setEmail(storedEmail);
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  if (!username || !email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />
        <h2>User Profile</h2>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>First Name:</strong> {firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {lastName}
        </p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
