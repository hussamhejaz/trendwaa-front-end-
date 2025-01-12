// src/pages/Overview.js
import React from "react";
import { FaShoppingCart, FaUsers, FaBoxOpen } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import 'chart.js/auto'; // Optional: Automatically register all components

const Overview = () => {
  // Sample data for charts
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        fill: false,
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
      },
    ],
  };

  const ordersData = {
    labels: ["Pending", "Completed", "Canceled"],
    datasets: [
      {
        data: [50, 150, 20],
        backgroundColor: ["#F59E0B", "#10B981", "#EF4444"],
        hoverBackgroundColor: ["#FBBF24", "#34D399", "#F87171"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaShoppingCart className="text-blue-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-xl font-semibold">$120,000</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaBoxOpen className="text-green-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-semibold">1,500</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaUsers className="text-purple-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">New Customers</p>
            <p className="text-xl font-semibold">300</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Over Time</h2>
          <Line data={salesData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <Bar data={ordersData} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
