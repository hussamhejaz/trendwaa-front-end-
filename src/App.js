// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ClientRoutes from './routes/ClientRoutes';  // Use ClientRoutes for client paths

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />

        {/* Use ClientRoutes for all other paths */}
        <Route path="/*" element={<ClientRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
