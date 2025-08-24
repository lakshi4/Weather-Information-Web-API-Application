// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Register.css"; // optional for styling
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // UI only (Auth0 will handle real signup)
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Redirect to Auth0 Signup Page
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup", // 👈 open signup form
        login_hint: email,     // pre-fill email in Auth0 form
      },
    });
  };

  return (
    <div className="register-page">
        <h1>Welcome to Weather App</h1>
      <h2>Create an Account</h2>
      <p>Sign up to  the Weather App</p>
      
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Register</button>
      </form>

       <p style={{ marginTop: "1rem", color: "#fff" }}>
        Already have an account?{" "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>


    </div>
  );
};

export default Register;