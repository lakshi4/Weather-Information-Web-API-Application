import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



// Pages
import Dashboard from './components/Dashboard.jsx';
import Weather from './components/Weather.jsx';

function App() {
  return (
    <Router>
      {/* Optional: Add your header */}
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/weather" element={<Weather />} />
          {/* 404 Route */}
          <Route path="*" element={<div className="text-center p-5">Page not found</div>} />
        </Routes>
      </main>
      {/* Optional: Add your footer */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;