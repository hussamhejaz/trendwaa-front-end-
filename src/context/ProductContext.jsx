// src/context/ProductContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const ProductContext = createContext();

// Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api";

  // Fetch all products
  const fetchProducts = async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setErrorProducts("Unexpected response structure for products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message || error);
      setErrorProducts("An error occurred while fetching products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [API_BASE_URL]);

  // Function to edit/update a product
  const editProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/products/update/${updatedProduct.productid}`,
        updatedProduct
      );

      if (response.status === 200) {
        // Update the product in local state
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod.productid === updatedProduct.productid
              ? { ...prod, ...response.data.data }
              : prod
          )
        );
        return { success: true, data: response.data.data };
      } else {
        return { success: false, error: response.data.error || "Unknown error" };
      }
    } catch (error) {
      console.error("Error editing product:", error.response?.data?.error || error.message || error);
      return { success: false, error: error.response?.data?.error || "An error occurred while updating the product." };
    }
  };

  // Add other context functions like addProduct, deleteProduct as needed...

  return (
    <ProductContext.Provider
      value={{
        products,
        loadingProducts,
        errorProducts,
        fetchProducts,
        editProduct,
        // Add other functions as needed...
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
