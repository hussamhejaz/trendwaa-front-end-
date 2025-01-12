// src/routes/ClientRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'; 
import ClientLayout from '../layouts/ClientLayout';
// Import other client pages as needed, e.g., ProductListClient, ProductDetails, etc.

const ClientRoutes = () => {
  return (
    <Routes>
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
       
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
