// index.js or main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-wq23z1nshptyrwkv.us.auth0.com"
    clientId="OKKTLfkzQxNfdYr6Cd6noBw96KWBwsve"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://YOUR_API_IDENTIFIER", // optional if you call backend
    }}
  >
    <App />
  </Auth0Provider>
);
