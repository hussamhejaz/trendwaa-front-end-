// src/components/Sidebar.js
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  FiHome,
  FiSettings,
  FiGrid,
  FiChevronDown,
  FiMenu,
  FiBox,
  FiTrendingUp
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle state
  const [activeMenu, setActiveMenu] = useState(""); // Tracks expanded menu
  const [activeItem, setActiveItem] = useState(""); // Tracks active menu item

  const location = useLocation();

  const menuItems = [
    {
      name: "Home",
      icon: <FiHome />,
      subItems: [
        { name: "Overview", path: "/dashboard/home/overview" },
        { name: "Recent Activity", path: "/dashboard/home/recent-activity" },
        { name: "Sales Reports", path: "/dashboard/home/sales-reports" },
      ],
    },
    {
      name: "Dashboard",
      icon: <FiGrid />,
      subItems: [
        { name: "Overview", path: "/dashboard/overview" },
        { name: "Weekly", path: "/dashboard/weekly" },
        { name: "Monthly", path: "/dashboard/monthly" },
        { name: "Annually", path: "/dashboard/annually" },
      ],
    },
    {
      name: "Products",
      icon: <FiBox />,
      subItems: [
        { name: "Add Products", path: "/dashboard/products/add" },
        { name: "Products List", path: "/dashboard/products/list" },
        { name: "Delete Products", path: "/dashboard/products/delete" },
        { name: "Add Category", path: "/dashboard/products/add-category" },
      ],
    },
    {
      name: "Orders",
      icon: <FiGrid />,
      subItems: [
        { name: "Processed", path: "/dashboard/orders/processed" },
        { name: "Shipped", path: "/dashboard/orders/shipped" },
        { name: "Returned", path: "/dashboard/orders/returned" },
      ],
    },
    {
      name: "Trends & Brands",
      icon: <FiTrendingUp />,  // Choose an appropriate icon
      subItems: [
        { name: "Featured Products", path: "/dashboard/trends-brands/featured-products" },
        { name: "Add Trends", path: "/dashboard/trends-brands/add-trends" },
        { name: "Add Brands", path: "/dashboard/trends-brands/add-brands" },
      ],
    },
    {
      name: "Account",
      icon: <FiSettings />,
      subItems: [
        { name: "New", path: "/dashboard/account/new" },
        { name: "Profile", path: "/dashboard/account/profile" },
        { name: "Settings", path: "/dashboard/account/settings" },
        { name: "Sign out", path: "/dashboard/account/signout" },
      ],
    },
    // New Menu Item: Trends & Brands
   
  ];

  const toggleMenu = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? "" : menuName));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-white shadow-lg text-gray-800 h-full flex flex-col transition-all duration-300`}
      >
        {/* Header with Toggle Button and Brand */}
        <div className="flex items-center p-4 border-b">
          {/* Toggle Button */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              if (!isOpen) setActiveMenu(""); // Close all menus when collapsing
            }}
            className={`text-gray-800 focus:outline-none p-2 rounded-full transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <FiMenu size={20} />
          </button>
          {/* TrendWaa Brand */}
          <h1
            className={`text-lg font-bold ml-3 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            TrendWaa
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto mt-4">
          {menuItems.map((item) => (
            <div key={item.name}>
              {/* Parent Menu Item */}
              <button
                onClick={() => toggleMenu(item.name)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg mb-2 ${
                  activeMenu === item.name
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-xl">{item.icon}</span>
                  {isOpen && (
                    <span className="ml-4 text-md font-medium">{item.name}</span>
                  )}
                </div>
                {isOpen && (
                  <FiChevronDown
                    className={`transition-transform ${
                      activeMenu === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Sub Menu Items */}
              {isOpen && activeMenu === item.name && (
                <div className="ml-8">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      onClick={() => setActiveItem(subItem.name)}
                      className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                        location.pathname === subItem.path
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          className={`p-4 border-t text-center text-sm text-gray-500 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {isOpen ? (
            <p>© 2024 TrendWaa. All rights reserved.</p>
          ) : (
            <p>©</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
