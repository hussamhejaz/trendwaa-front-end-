// src/pages/Dashboard/Monthly.js
import React from "react";
import { FaMoneyBillWave, FaUserPlus, FaChartLine } from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";

const DashboardMonthly = () => {
  // Sample data for Monthly Revenue
  const monthlyRevenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [50000, 60000, 55000, 70000, 65000, 80000],
        fill: true,
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        borderColor: "#34D399",
        tension: 0.4,
      },
    ],
  };

  const monthlyRevenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Revenue Trends",
      },
    },
  };

  // Sample data for Customer Acquisition (Doughnut Chart)
  const customerAcquisitionData = {
    labels: ["Organic", "Referral", "Paid Ads"],
    datasets: [
      {
        label: "Customer Acquisition",
        data: [300, 200, 100],
        backgroundColor: ["#3B82F6", "#F59E0B", "#EF4444"],
        hoverBackgroundColor: ["#60A5FA", "#FBBF24", "#F87171"],
      },
    ],
  };

  const customerAcquisitionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Customer Acquisition Sources",
      },
    },
  };

  // Sample data for Product Performance
  const productPerformance = [
    { product: "Wireless Earbuds", sales: 500 },
    { product: "Smartwatch Pro", sales: 450 },
    { product: "Gaming Laptop", sales: 300 },
    { product: "4K Monitor", sales: 250 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Monthly Dashboard</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaMoneyBillWave className="text-green-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Monthly Revenue</p>
            <p className="text-xl font-semibold">$350,000</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaUserPlus className="text-blue-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">New Customers</p>
            <p className="text-xl font-semibold">1,200</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <FaChartLine className="text-indigo-500 text-3xl" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Product Performance</p>
            <p className="text-xl font-semibold">4 Top Products</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Line data={monthlyRevenueData} options={monthlyRevenueOptions} />
        </div>

        {/* Customer Acquisition Chart */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
          <Doughnut data={customerAcquisitionData} options={customerAcquisitionOptions} />
        </div>
      </div>

      {/* Product Performance */}
      <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
        <h2 className="text-lg font-semibold mb-4">Top Performing Products</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Product</th>
              <th className="py-2">Units Sold</th>
            </tr>
          </thead>
          <tbody>
            {productPerformance.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{item.product}</td>
                <td className="py-2">{item.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMonthly;
