import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



// Pages
import Dashboard from './components/Dashboard.jsx';
import Weather from './components/Weather.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

function App() {
  return (
    <Router>
      
      <main>
        <Routes>
          <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/weather" element={<Weather />} />
          {/* 404 Route */}
          <Route path="*" element={<div className="text-center p-5">Page not found</div>} />
        </Routes>
      </main>
      
    </Router>
  );
}

export default App;