// src/layouts/DashboardLayout.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// Import dashboard pages
import Overview from "../pages/Home/Overview";
import RecentActivity from "../pages/Home/RecentActivity";
import SalesReports from "../pages/Home/SalesReports";
import DashboardOverview from "../pages/Dashboard/Overview";
import DashboardWeekly from "../pages/Dashboard/Weekly";
import DashboardMonthly from "../pages/Dashboard/Monthly";
import DashboardAnnually from "../pages/Dashboard/Annually";
// Products Pages for dashboard
import ProductsList from '../pages/Products/ ProductsList';
import AddProduct from "../pages/Products/AddProduct";
import EditProduct from "../pages/Products/EditProduct";
import ProductView from "../pages/Products/ProductView";
import AddCategory from "../pages/Products/AddCategory";
import FeaturedProducts from "../pages/trend and brand/FeaturedProducts.jsx"
import AddTrends from '../pages/trend and brand/AddTrends.jsx';
import DeleteProduct from '../pages/Products/DeleteProduct.jsx';
import AddBrand from '../pages/trend and brand/AddBrand.jsx';


const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Routes>
        <Route index element={<Navigate to="home/overview" replace />} />
          {/* Home Routes */}
          <Route path="/home/overview" element={<Overview />} />
          <Route path="/home/recent-activity" element={<RecentActivity />} />
          <Route path="/home/sales-reports" element={<SalesReports />} />

          {/* Dashboard Routes */}
          <Route path="/overview" element={<DashboardOverview />} />
          <Route path="/weekly" element={<DashboardWeekly />} />
          <Route path="/monthly" element={<DashboardMonthly />} />
          <Route path="/annually" element={<DashboardAnnually />} />

          {/* Products Routes */}
          <Route path="/products/list" element={<ProductsList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/view/:productid" element={<ProductView />} />
          <Route path="/products/delete" element={<DeleteProduct />} />
          <Route path="/products/add-category" element={<AddCategory />} />
          <Route path="/trends-brands/featured-products" element={<FeaturedProducts />} />
          <Route path="/trends-brands/add-trends" element={<AddTrends />} />
          <Route path="/trends-brands/add-brands" element={<AddBrand />} />
     

          {/* Add other dashboard routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
