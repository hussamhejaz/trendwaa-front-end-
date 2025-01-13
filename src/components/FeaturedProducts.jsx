// src/components/FeaturedProducts.js
import React, { useEffect, useState } from 'react';
import CircularLoader from './CircularLoader';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/products'); // Adjust base URL if necessary
      const json = await res.json();
      setProducts(json.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleFeatured = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/products/toggle-featured/${id}`, {
        method: 'PUT',
      });
      const result = await res.json();
      // Optionally handle response or show notification
      // Refresh product list after toggle
      fetchProducts();
    } catch (err) {
      console.error('Error toggling featured status:', err);
    }
  };
//   const CircularLoader = () => (
//       <div className="flex items-center justify-center min-h-screen">
//         <motion.div
//           className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
//           aria-label="Loading"
//           role="status"
//           initial={{ rotate: 0 }}
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//         />
//       </div>
//   )

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Featured Products</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Product Name</th>
            <th className="py-2">Is Featured</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productid} className="border-t">
              <td className="py-2 px-4">{product.productname}</td>
              <td className="py-2 px-4">{product.isfeatured ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => toggleFeatured(product.productid)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  {product.isfeatured ? 'Remove Featured' : 'Make Featured'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedProducts;
