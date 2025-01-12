// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ClientLayout from './layouts/ClientLayout'; // if needed directly
import Home from './UserStore/Home'; // or use ClientRoutes if defined separately

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />

        {/* Client routes */}
        <Route path="/*" element={<ClientLayout />}>
      
          <Route index element={<Home />} />
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
