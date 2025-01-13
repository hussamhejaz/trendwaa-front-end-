import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../UserStore/Home';
import ClientLayout from '../layouts/ClientLayout';

// Import category pages
import Women from '../UserStore/Women';
import Beauty from '../UserStore/Beauty';
import HomeKitchen from '../UserStore/HomeKitchen';
import JewelryAccessories from '../UserStore/JewelryAccessories';
import ProductDetails from '../UserStore/ProductDetails';

// Import new pages
import Wishlist from '../UserStore/Wishlist';
import Cart from '../UserStore/Cart';
import Login from '../UserStore/Login';
import Orders from '../UserStore/Orders';
import Coupons from '../UserStore/Coupons';
import Messages from '../UserStore/Messages';
import Points from '../UserStore/Points';
import Signup from '../UserStore/Signup';
import Profile from '../UserStore/Profile';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="women" element={<Women />} />
        <Route path="beauty" element={<Beauty />} />
        <Route path="home-kitchen" element={<HomeKitchen />} />
        <Route path="jewelry-accessories" element={<JewelryAccessories />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="orders" element={<Orders />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="messages" element={<Messages />} />
        <Route path="points" element={<Points />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        {/* Add additional routes as needed */}
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
