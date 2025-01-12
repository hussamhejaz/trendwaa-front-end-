// src/hooks/useAddCategory.js

import { useState } from "react";

const useAddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);

  const addCategory = async (categoryData) => {
    setLoading(true);
    setAddError(null);
    setAddSuccess(null);
    try {
      const response = await fetch("http://localhost:5001/api/categories/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const validationErrors = data.errors.map((err) => err.msg).join(", ");
          throw new Error(validationErrors);
        } else {
          throw new Error(data.message || "Failed to add category.");
        }
      }

      setAddSuccess(data.message || "Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      setAddError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { addCategory, loading, addError, addSuccess };
};

export default useAddCategory;
