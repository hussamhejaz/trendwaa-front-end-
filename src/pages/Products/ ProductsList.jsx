// ProductsList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Reusable ProductCard Component
const ProductCard = ({ product }) => {
  const imageUrl =
    Array.isArray(product.mediaurl) && product.mediaurl.length > 0
      ? product.mediaurl[0]
      : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img
          src={imageUrl}
          alt={product.productname}
          className="w-full h-56 object-cover"
          onError={(e) => {
            console.error(
              `Failed to load image for Product ID: ${product.productid}, URL: ${imageUrl}`
            );
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; // Fallback image
          }}
          loading="lazy"
        />
        {product.discountpercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
            {product.discountpercentage}% OFF
          </span>
        )}
        {product.isfeatured && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-sm font-semibold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
          {product.productname}
        </h2>
        <p className="text-gray-600 mt-1">SKU: {product.sku}</p>
        <div className="mt-3 flex items-center space-x-2">
          {product.discountpercentage > 0 ? (
            <>
              <span className="text-lg font-bold text-red-600">
                ${(product.priceafterdiscount || product.price).toFixed(2)}
              </span>
              <span className="text-sm line-through text-gray-500">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-800">
              ${product.price ? product.price.toFixed(2) : "N/A"}
            </span>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <Link
            to={`/products/view/${product.productid}`}
            className="text-blue-500 hover:underline font-medium"
          >
            View
          </Link>
          <Link
            to={`/products/edit/${product.productid}`}
            className="text-green-500 hover:underline font-medium"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api";

  // Utility function to extract categories
  const extractCategories = (response) => {
    if (response.data && Array.isArray(response.data.categories)) {
      return response.data.categories;
    } else if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data.categoriesList)
    ) {
      return response.data.data.categoriesList;
    }
    return null;
  };

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        console.log("Fetched Categories Response:", response);

        const fetchedCategories = extractCategories(response);
        if (fetchedCategories) {
          setCategories(fetchedCategories);
        } else {
          setErrorCategories("Unexpected response structure for categories.");
          console.log("Unhandled response structure:", response.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err.message || err);
        setErrorCategories("An error occurred while fetching categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [API_BASE_URL]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);

      try {
        // Construct the products endpoint with optional category filter
        let endpoint = `${API_BASE_URL}/products`;
        if (selectedCategoryId) {
          endpoint += `?categoryId=${selectedCategoryId}`;
        }

        const response = await axios.get(endpoint);
        console.log("Fetched Products:", response.data.products);

        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setErrorProducts("Unexpected response structure for products.");
        }
      } catch (err) {
        console.error("Error fetching products:", err.message || err);
        setErrorProducts("An error occurred while fetching products.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [API_BASE_URL, selectedCategoryId]);

  // Handle Category Change
  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Products</h1>

      {/* Category Filter */}
      <div className="mb-6 flex justify-center">
        {loadingCategories ? (
          <div className="w-64 h-10 bg-gray-300 rounded animate-pulse"></div>
        ) : errorCategories ? (
          <p className="text-red-500">{errorCategories}</p>
        ) : (
          <select
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option
                key={category.categoryid || category.id || category.categoryId}
                value={category.categoryid || category.id || category.categoryId}
              >
                {category.categoryname || category.name || category.categoryName}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Products Section */}
      {loadingProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="w-full h-56 bg-gray-300"></div>
              <div className="p-5">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : errorProducts ? (
        <p className="text-center text-red-500">{errorProducts}</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products available in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.productid} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
