import React, { useState } from "react";
import axios from "axios";
import "../style/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        userData
      );
      console.log("Login Response:", response.data); // Debugging

      const { token, role, username, email: userEmail } = response.data;

      if (token && role && username && email) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username); // ✅ Store username
        localStorage.setItem("email", email); // ✅ Store email

        window.location.href = "/"; // Redirect to homepage
      } else {
        console.error("Login failed: Missing user data");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Login;
