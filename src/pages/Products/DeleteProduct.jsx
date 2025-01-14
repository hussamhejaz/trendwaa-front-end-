// src/pages/Products/DeleteProduct.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const API_BASE_URL = "http://localhost:5001/api";

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();
      console.log("API response:", data);

      const productsArray = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
        ? data.products
        : [];

      setProducts(productsArray);
      setFilteredProducts(productsArray); // initialize filtered list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete the product.");
      }
      toast.success("Product deleted successfully!");
      // Refresh products list after deletion
      await fetchProducts();
      // Reset search after deletion to show updated list
      setSearchTerm("");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(err.message || "Error deleting product.");
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // If search term is empty, show all products
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = products.filter((product) => 
        product.productname?.toLowerCase().includes(term) ||
        product.productnumber?.toString().toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer />
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Delete Products</h2>
        <p className="mt-2 text-gray-600">Manage and remove products easily</p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-6 space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.productid} className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{product.productname}</h3>
                <p className="text-gray-500 mt-2">Product Number: {product.productnumber}</p>
              </div>
              <button
                onClick={() => {
                  setDeletingProduct(product);
                  setShowDialog(true);
                }}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      {showDialog && deletingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deletingProduct.productname}</span>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDialog(false);
                  setDeletingProduct(null);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (deletingProduct) {
                    await handleDelete(deletingProduct.productid);
                  }
                  setShowDialog(false);
                  setDeletingProduct(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
