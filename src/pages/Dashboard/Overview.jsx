// src/pages/Dashboard/Overview.js
import React from "react";
import { FaDollarSign, FaUsers, FaBoxOpen } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";

const DashboardOverview = () => {
  // Sample data for Revenue
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [5000, 7000, 8000, 6000, 9000, 10000],
        fill: true,
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "#22C55E",
        tension: 0.4,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Revenue",
      },
    },
  };

  // Sample data for Active Users
  const activeUsersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Users",
        data: [150, 200, 250, 220, 300, 350],
        fill: false,
        backgroundColor: "#3B82F6",
        borderColor: "#3B82F6",
        tension: 0.4,
      },
    ],
  };

  const activeUsersOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Active Users Over Time",
      },
    },
  };

  // Sample data for Inventory Status (Bar Chart)
  const inventoryData = {
    labels: ["Electronics", "Apparel", "Home Goods", "Beauty", "Toys"],
    datasets: [
      {
        label: "Items in Stock",
        data: [120, 200, 150, 80, 100],
        backgroundColor: "#F59E0B",
      },
    ],
  };

  const inventoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Inventory Status",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaDollarSign className="text-green-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-semibold">$60,000</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaUsers className="text-blue-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-xl font-semibold">350</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaBoxOpen className="text-yellow-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Inventory Items</p>
            <p className="text-xl font-semibold">650</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Line data={revenueData} options={revenueOptions} />
        </div>

        {/* Active Users Chart */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Line data={activeUsersData} options={activeUsersOptions} />
        </div>
      </div>

      {/* Inventory Status */}
      <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
        <Bar data={inventoryData} options={inventoryOptions} />
      </div>
    </div>
  );
};

export default DashboardOverview;
