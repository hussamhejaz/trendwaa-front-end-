// src/pages/AddTrends.js
import React, { useEffect, useState } from 'react';
import CircularLoader from '../../components/CircularLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTrends = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api";

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      const json = await res.json();
      setProducts(json.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle product selection for adding to trends
  const handleSelectProduct = (productId) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  // Submit selected products to mark them as trends
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/trends/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds: selectedProducts }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success('Trends added successfully!');
        setSelectedProducts([]); // Clear selection after success
        fetchProducts(); // Refresh list to update trend statuses
      } else {
        toast.error(result.error || 'Error adding trends.');
      }
    } catch (error) {
      console.error('Error submitting trends:', error);
      toast.error('Error adding trends.');
    }
  };

  // Handle removal of a product from trends
  const handleRemoveTrend = async (productId) => {
    try {
      await fetch(`${API_BASE_URL}/products/toggle-trend/${productId}`, { method: 'PUT' });
      toast.success('Trend removed successfully!');
      // Update local state to reflect removal of trend
      setProducts(prevProducts => prevProducts.map(p => 
        p.productid === productId ? { ...p, istrend: !p.istrend } : p
      ));
      setSelectedProducts(prevSelected => prevSelected.filter(id => id !== productId));
    } catch (error) {
      console.error("Error toggling trend:", error);
      toast.error("Error removing trend.");
    }
  };

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Add Trends</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => {
          const imageUrl =
            Array.isArray(product.mediaurl) && product.mediaurl.length > 0
              ? product.mediaurl[0]
              : "https://via.placeholder.com/300x200?text=No+Image";

          return (
            <div
              key={product.productid}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={imageUrl}
                alt={product.productname}
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                }}
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {product.productname}
                </h2>
                {product.istrend ? (
                  <>
                    <div className="text-indigo-500 font-bold mb-2">Already Trending</div>
                    <button
                      onClick={() => handleRemoveTrend(product.productid)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Remove Trend
                    </button>
                  </>
                ) : (
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedProducts.includes(product.productid)}
                      onChange={() => handleSelectProduct(product.productid)}
                    />
                    Select to Trend
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={selectedProducts.length === 0}
      >
        Add Selected as Trends
      </button>
    </div>
  );
};

export default AddTrends;
