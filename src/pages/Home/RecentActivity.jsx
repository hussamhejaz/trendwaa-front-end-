// src/pages/RecentActivity.js
import React from "react";

const RecentActivity = () => {
  // Sample data
  const recentOrders = [
    { id: "#1234", customer: "John Doe", total: "$250", status: "Completed" },
    { id: "#1235", customer: "Jane Smith", total: "$150", status: "Pending" },
    { id: "#1236", customer: "Alice Johnson", total: "$300", status: "Shipped" },
  ];

  const newCustomers = [
    { name: "Emily Clark", date: "2024-04-20" },
    { name: "Michael Brown", date: "2024-04-19" },
    { name: "Jessica Davis", date: "2024-04-18" },
  ];

  const productUpdates = [
    { name: "Summer Dress", action: "Added", date: "2024-04-20" },
    { name: "Winter Jacket", action: "Updated", date: "2024-04-19" },
    { name: "Casual Shoes", action: "Added", date: "2024-04-18" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Recent Orders */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.customer}</td>
                <td className="py-2">{order.total}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Customers */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">New Customers</h2>
        <ul>
          {newCustomers.map((customer, index) => (
            <li key={index} className="py-2 border-t">
              <span className="font-medium">{customer.name}</span> -{" "}
              <span className="text-sm text-gray-500">{customer.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Updates */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Product Updates</h2>
        <ul>
          {productUpdates.map((product, index) => (
            <li key={index} className="py-2 border-t">
              <span className="font-medium">{product.name}</span> -{" "}
              <span className="text-sm text-gray-500">{product.action} on {product.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
