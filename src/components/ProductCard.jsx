// src/components/ProductCard.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useContext(ProductContext);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.category}</p>
        <p className="mt-2 text-blue-600 font-bold">${product.price}</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Link
            to={`/products/view/${product.id}`}
            className="text-gray-600 hover:text-blue-500"
            title="View Product"
          >
            <FiEye size={20} />
          </Link>
          <Link
            to={`/products/edit/${product.id}`}
            className="text-gray-600 hover:text-green-500"
            title="Edit Product"
          >
            <FiEdit size={20} />
          </Link>
          <button
            onClick={handleDelete}
            className="text-gray-600 hover:text-red-500"
            title="Delete Product"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
