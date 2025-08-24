// AuthButton.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const AuthButton = () => {
  const { logout, isAuthenticated } = useAuth0();
   const navigate = useNavigate();

  return (
    <div style={{ marginBottom: "1rem" }}>
      {isAuthenticated ? (
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Logout
        </button>
      ) : (
        <><button onClick={() => navigate("/login")}>Login</button><button onClick={() => navigate("/register")}>Register</button></>
      )}
    </div>
  );
};

export default AuthButton;
