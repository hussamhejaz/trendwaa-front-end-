// src/components/FeaturedProducts.js
import React, { useEffect, useState } from 'react';
import CircularLoader from '../../components/CircularLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' or 'featured'
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/products');
      const json = await res.json();
      return json.products;
    } catch (err) {
      console.error('Error fetching products:', err);
      return [];
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/categories');
      const json = await res.json();
      return json; // expecting an array of categories
    } catch (err) {
      console.error('Error fetching categories:', err);
      return [];
    }
  };

  // Combined fetch for products and categories
  const fetchData = async () => {
    try {
      setLoading(true);
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      
      // Create a mapping from category ID to category name
      const categoriesMap = {};
      fetchedCategories.forEach(cat => {
        categoriesMap[cat.id] = cat.name;
      });

      // Add category name to each product based on categoryid
      const productsWithCategory = fetchedProducts.map(product => ({
        ...product,
        category: categoriesMap[product.categoryid] || 'Unknown',
      }));

      setProducts(productsWithCategory);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching products or categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleFeatured = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/products/toggle-featured/${id}`, {
        method: 'PUT',
      });
      // Locally update the product's featured status without refetching
      setProducts(prevProducts => prevProducts.map(product => {
        if(product.productid === id) {
          return { ...product, isfeatured: !product.isfeatured };
        }
        return product;
      }));
      toast.success('Featured status toggled successfully!');
    } catch (err) {
      console.error('Error toggling featured status:', err);
      toast.error('Error toggling featured status.');
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleCategoryChange = (e) => setCategoryFilter(e.target.value);

  // Derive unique categories for the dropdown options
  const uniqueCategories = ['all', ...categories.map(cat => cat.name)];

  // Filter products based on search, featured status, and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'featured' && product.isfeatured);
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Manage Featured Products</h1>

      {/* Search, Filter, and Category Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={filter}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Products</option>
          <option value="featured">Featured Only</option>
        </select>

        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Is Featured</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.productid}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.productname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.isfeatured ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFeatured(product.productid)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        product.isfeatured
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {product.isfeatured ? 'Remove Featured' : 'Make Featured'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedProducts;
