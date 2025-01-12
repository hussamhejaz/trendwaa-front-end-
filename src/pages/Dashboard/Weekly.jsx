// src/pages/Dashboard/Weekly.js
import React from "react";
import { FaChartBar, FaUserCheck, FaBoxOpen } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";

const DashboardWeekly = () => {
  // Sample data for Weekly Sales
  const weeklySalesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1000, 1500, 1200, 1800, 2000, 2500, 3000],
        backgroundColor: "#6366F1",
      },
    ],
  };

  const weeklySalesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Sales",
      },
    },
  };

  // Sample data for User Engagement (Pie Chart)
  const userEngagementData = {
    labels: ["Likes", "Comments", "Shares"],
    datasets: [
      {
        label: "Engagement",
        data: [300, 100, 150],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        hoverBackgroundColor: ["#34D399", "#FBBF24", "#F87171"],
      },
    ],
  };

  const userEngagementOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "User Engagement",
      },
    },
  };

  // Sample data for Inventory Changes
  const inventoryChanges = [
    { product: "Smartphone X", change: "+50" },
    { product: "Leather Jacket", change: "-20" },
    { product: "Running Shoes", change: "+30" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Weekly Dashboard</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaChartBar className="text-indigo-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Weekly Sales</p>
            <p className="text-xl font-semibold">$12,000</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaUserCheck className="text-green-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">User Engagement</p>
            <p className="text-xl font-semibold">550</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaBoxOpen className="text-yellow-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Inventory Changes</p>
            <p className="text-xl font-semibold">+60</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Sales Chart */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Bar data={weeklySalesData} options={weeklySalesOptions} />
        </div>

        {/* User Engagement Chart */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Pie data={userEngagementData} options={userEngagementOptions} />
        </div>
      </div>

      {/* Inventory Changes */}
      <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
        <h2 className="text-lg font-semibold mb-4">Inventory Changes</h2>
        <ul>
          {inventoryChanges.map((item, index) => (
            <li key={index} className="flex justify-between py-2 border-t">
              <span>{item.product}</span>
              <span
                className={`px-2 py-1 text-sm rounded ${
                  item.change.startsWith("+")
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.change}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardWeekly;
