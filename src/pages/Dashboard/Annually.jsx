// src/pages/Dashboard/Annually.js
import React from "react";
import { FaChartPie, FaUserTie, FaArrowUp } from "react-icons/fa";
import { Pie, Radar } from "react-chartjs-2";

const DashboardAnnually = () => {
  // Sample data for Annual Revenue
  const annualRevenueData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [300000, 350000, 400000, 450000, 500000],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  const annualRevenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Annual Revenue Growth",
      },
    },
  };

  // Sample data for Year-over-Year Growth (Radar Chart)
  const yoyGrowthData = {
    labels: ["Revenue", "Customers", "Orders", "Products"],
    datasets: [
      {
        label: "2022",
        data: [450000, 1000, 5000, 200],
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        borderColor: "#4ADE80",
        pointBackgroundColor: "#4ADE80",
      },
      {
        label: "2023",
        data: [500000, 1200, 5500, 220],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3B82F6",
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const yoyGrowthOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Year-over-Year Growth",
      },
    },
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  // Sample data for Customer Retention
  const customerRetention = [
    { year: "2019", retention: "60%" },
    { year: "2020", retention: "65%" },
    { year: "2021", retention: "70%" },
    { year: "2022", retention: "75%" },
    { year: "2023", retention: "80%" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Annual Dashboard</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaArrowUp className="text-indigo-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Yearly Growth</p>
            <p className="text-xl font-semibold">+25%</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaUserTie className="text-blue-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Customer Retention</p>
            <p className="text-xl font-semibold">80%</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaChartPie className="text-yellow-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Market Share</p>
            <p className="text-xl font-semibold">15%</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Annual Revenue Chart */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Pie data={annualRevenueData} options={annualRevenueOptions} />
        </div>

        {/* Year-over-Year Growth Chart */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Radar data={yoyGrowthData} options={yoyGrowthOptions} />
        </div>
      </div>

      {/* Customer Retention */}
      <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
        <h2 className="text-lg font-semibold mb-4">Customer Retention Over Years</h2>
        <ul>
          {customerRetention.map((item, index) => (
            <li key={index} className="flex justify-between py-2 border-t">
              <span>{item.year}</span>
              <span
                className={`px-2 py-1 text-sm rounded ${
                  parseInt(item.retention) >= 75
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.retention}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardAnnually;
