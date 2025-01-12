// src/pages/SalesReports.js
import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SalesReports = () => {
  // Sample data for Sales Trends (Line Chart)
  const salesTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Sales ($)",
        data: [12000, 15000, 17000, 14000, 18000, 22000, 24000, 20000, 26000],
        fill: true,
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "#4F46E5",
        tension: 0.4,
      },
    ],
  };

  const salesTrendsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Trends",
      },
    },
  };

  // Sample data for Product Performance (Bar Chart)
  const productPerformanceData = {
    labels: ["Summer Dress", "Winter Jacket", "Casual Shoes", "Accessories", "Bags"],
    datasets: [
      {
        label: "Units Sold",
        data: [300, 150, 400, 200, 350],
        backgroundColor: "#10B981",
      },
    ],
  };

  const productPerformanceOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Product Performance",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  // Sample data for Customer Behavior (Pie Chart)
  const customerBehaviorData = {
    labels: ["Returning Customers", "New Customers"],
    datasets: [
      {
        label: "Customer Types",
        data: [80, 120],
        backgroundColor: ["#3B82F6", "#9333EA"],
        hoverBackgroundColor: ["#60A5FA", "#C084FC"],
      },
    ],
  };

  const customerBehaviorOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Customer Behavior",
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Sales Reports</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Export Reports
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Sales Trends */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Line data={salesTrendsData} options={salesTrendsOptions} />
        </div>

        {/* Product Performance */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Bar data={productPerformanceData} options={productPerformanceOptions} />
        </div>

        {/* Customer Behavior */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Pie data={customerBehaviorData} options={customerBehaviorOptions} />
        </div>
      </div>

      {/* Additional Insights (Optional) */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top Performing Regions</h2>
        {/* You can add another chart or a table here */}
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </div>
  );
};

export default SalesReports;
