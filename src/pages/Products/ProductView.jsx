// ProductView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import { FaArrowLeft, FaEdit, FaImages } from 'react-icons/fa';
import DOMPurify from 'dompurify'; // For sanitizing HTML
import { Tab } from '@headlessui/react'; // For tabs
import CircularLoader from "../../components/CircularLoader";

const ProductView = () => {
  const { productid } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("N/A");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api";

  useEffect(() => {
    const fetchProductAndCategory = async () => {
      try {
        // Fetch product data
        const productResponse = await axios.get(`${API_BASE_URL}/products/${productid}`);
        console.log("Fetched Product:", productResponse.data);
        let fetchedProduct = null;

        if (productResponse.data && productResponse.data.product) {
          fetchedProduct = productResponse.data.product;
        } else if (productResponse.data) {
          fetchedProduct = productResponse.data; // Adjust based on actual API response
        } else {
          throw new Error("Product data is unavailable.");
        }

        setProduct(fetchedProduct);

        // Check if categoryid exists and fetch category name
        if (fetchedProduct.categoryid) {
          try {
            const categoryResponse = await axios.get(`${API_BASE_URL}/categories/${fetchedProduct.categoryid}`);
            console.log("Fetched Category:", categoryResponse.data);
            if (categoryResponse.data && categoryResponse.data.name) {
              setCategoryName(categoryResponse.data.name);
            } else {
              setCategoryName("N/A");
            }
          } catch (catErr) {
            console.error("Error fetching category:", catErr.message || catErr);
            setCategoryName("N/A");
          }
        } else {
          setCategoryName("N/A");
        }
      } catch (err) {
        console.error("Error fetching product:", err.message || err);
        setError("An error occurred while fetching the product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndCategory();
  }, [API_BASE_URL, productid]);

  if (loading) {
    return <CircularLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
        <FaArrowLeft className="text-red-500 text-6xl mb-4" />
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-4">
        <FaArrowLeft className="text-yellow-500 text-6xl mb-4" />
        <p className="text-yellow-700 text-lg mb-4">Product not found.</p>
        <Link
          to="/dashboard/products/list"
          className="flex items-center px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>
    );
  }

  // Destructure product data
  const {
    productnumber,
    sku,
    productname,
    categoryid,
    price,
    discountpercentage,
    stockquantity,
    inventoryalertthreshold,
    brand,
    warranty,
    description,
    tags,
    mediaurl,
    isfeatured,
  } = product;

  const imageUrls =
    Array.isArray(mediaurl) && mediaurl.length > 0
      ? mediaurl
      : ["https://via.placeholder.com/1200x800?text=No+Image"];

  // Calculate discounted price
  const discountedPrice = discountpercentage > 0
    ? (price * (1 - discountpercentage / 100)).toFixed(2)
    : price?.toFixed(2) || "N/A";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-6"> {/* Reduced max-width for better control */}
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition"
            aria-label="Go Back"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-3xl font-extrabold text-gray-800">{productname}</h1>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative">
            <Carousel
              showThumbs={true}
              infiniteLoop
              useKeyboardArrows
              autoPlay
              dynamicHeight={false}
              className="rounded-2xl overflow-hidden shadow-lg"
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={label}
                  >
                    &#10094;
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={label}
                  >
                    &#10095;
                  </button>
                )
              }
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                const bgColor = isSelected ? "bg-blue-600" : "bg-gray-300";
                return (
                  <li
                    className={`inline-block mx-1 rounded-full cursor-pointer ${bgColor}`}
                    key={index}
                    onClick={onClickHandler}
                    aria-label={`${label} ${index + 1}`}
                    title={`${label} ${index + 1}`}
                    style={{ width: 12, height: 12 }}
                  ></li>
                );
              }}
            >
              {imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`${productname} - Image ${index + 1}`}
                    className="w-full object-contain max-h-80" // Controlled max height
                    loading="lazy"
                    onError={(e) => {
                      console.error(
                        `Failed to load image for Product ID: ${productid}, URL: ${url}`
                      );
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = "https://via.placeholder.com/1200x800?text=No+Image"; // Fallback image
                    }}
                  />
                  {/* Zoom Icon */}
                  <button
                    onClick={() => window.open(url, "_blank")}
                    className="absolute top-4 right-4 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition"
                    aria-label="View Full Image"
                  >
                    <FaImages />
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
          {imageUrls.length > 1 && (
            <div className="mt-2 text-center text-sm text-gray-500">
              {imageUrls.length} images available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Badges */}
          <div className="flex items-center space-x-2 mb-4">
            {isfeatured && (
              <motion.span
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                Featured
              </motion.span>
            )}
            {discountpercentage > 0 && (
              <motion.span
                className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {discountpercentage}% OFF
              </motion.span>
            )}
            {stockquantity <= inventoryalertthreshold && (
              <motion.span
                className="bg-gradient-to-r from-orange-300 to-orange-400 text-white text-xs px-3 py-1 rounded-full shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Low Stock
              </motion.span>
            )}
          </div>

          {/* Pricing and Stock Information */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
            {/* Pricing */}
            <div>
              {discountpercentage > 0 ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-red-600">
                    ${discountedPrice}
                  </span>
                  <span className="text-xl line-through text-gray-500 ml-4">
                    ${price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-800">
                  ${price ? price.toFixed(2) : "N/A"}
                </span>
              )}
            </div>
            {/* Stock */}
            <div className="mt-4 md:mt-0">
              <p className={`text-lg ${stockquantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stockquantity > 0 ? `${stockquantity} available` : "Out of stock"}
              </p>
              {stockquantity > 0 && (
                <p className="text-gray-600">
                  <span className="font-semibold">Inventory Alert Threshold:</span> {inventoryalertthreshold}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Link
              to={`/dashboard/products/edit/${productid}`}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md flex items-center justify-center"
              aria-label="Edit Product"
            >
              <FaEdit className="mr-2" /> Edit Product
            </Link>
            <Link
              to="/dashboard/products/list"
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition shadow-md flex items-center justify-center"
              aria-label="Back to Products"
            >
              <FaArrowLeft className="mr-2" /> Back to Products
            </Link>
          </div>
        </div>

        {/* Tabbed Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-100 p-1">
              <Tab
                className={({ selected }) =>
                  selected
                    ? 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg'
                    : 'w-full py-2.5 text-sm leading-5 font-medium text-blue-500 hover:bg-white/[0.12] hover:text-blue-700 rounded-lg'
                }
              >
                Description
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg'
                    : 'w-full py-2.5 text-sm leading-5 font-medium text-blue-500 hover:bg-white/[0.12] hover:text-blue-700 rounded-lg'
                }
              >
                Specifications
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg'
                    : 'w-full py-2.5 text-sm leading-5 font-medium text-blue-500 hover:bg-white/[0.12] hover:text-blue-700 rounded-lg'
                }
              >
                Reviews
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-4">
              {/* Description Panel */}
              <Tab.Panel>
                <div
                  className="prose prose-lg text-gray-600"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description || "<p>No description available.</p>") }}
                />
              </Tab.Panel>
              {/* Specifications Panel */}
              <Tab.Panel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">SKU:</h3>
                    <p className="text-gray-600">{sku || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Product Number:</h3>
                    <p className="text-gray-600">{productnumber || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Category:</h3>
                    <p className="text-gray-600">
                      {categoryid ? (
                        <>
                          <Link
                            to={`/categories/${categoryid}`}
                            className="text-blue-600 hover:underline"
                            aria-label={`View products in category ${categoryName}`}
                          >
                            {categoryName}
                          </Link>
                          
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Brand:</h3>
                    <p className="text-gray-600">{brand || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Warranty:</h3>
                    <p className="text-gray-600">{warranty || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Stock Quantity:</h3>
                    <p className={`text-gray-600 ${stockquantity <= inventoryalertthreshold ? 'text-orange-600' : ''}`}>
                      {stockquantity > 0 ? `${stockquantity} in stock` : "Out of stock"}
                    </p>
                  </div>
                </div>
              </Tab.Panel>
              {/* Reviews Panel */}
              <Tab.Panel>
                {/* Placeholder for Reviews */}
                <div className="bg-gray-100 p-6 rounded-md">
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                  {/* Future Implementation: List of reviews and review form */}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-4 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;
