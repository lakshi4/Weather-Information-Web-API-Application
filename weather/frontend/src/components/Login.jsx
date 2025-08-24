// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Here you can add validation or Auth0 call
    // For now, just navigate to dashboard after form submission
    if (email && password) {
      navigate("/weather");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="login-page">
      <h2>Welcome to Weather App</h2>
      <p>Please log in to continue</p>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
