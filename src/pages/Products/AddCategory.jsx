// src/components/AddCategory.jsx

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useAddCategory from "../../hooks/useAddCategory"; // Correct import path

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      categoryName: "",
      description: "",
      attributes: [
        {
          name: "",
          label: "",
          type: "",
          placeholder: "",
          tooltip: "",
          options: [], // Optional
          validation: {}, // Optional
        },
      ],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const { addCategory, loading, addError, addSuccess } = useAddCategory();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (addSuccess || addError) {
        reset();
        setSuccessMessage(addSuccess);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [addSuccess, addError, reset]);

  const onSubmit = async (data) => {
    await addCategory(data);
    if (!addError) {
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Category</h2>

        {addSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            {addSuccess}
          </div>
        )}
        {addError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {addError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              {...register("categoryName", { required: "Category Name is required." })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.categoryName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="Enter category name"
            />
            {errors.categoryName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Attributes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attributes
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="border p-4 mb-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold">Attribute {index + 1}</h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Attribute Name */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register(`attributes.${index}.name`, { required: "Name is required." })}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.attributes?.[index]?.name ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Attribute name"
                  />
                  {errors.attributes?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.attributes[index].name.message}
                    </p>
                  )}
                </div>

                {/* Attribute Label */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Label
                  </label>
                  <input
                    type="text"
                    {...register(`attributes.${index}.label`, { required: "Label is required." })}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.attributes?.[index]?.label ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Attribute label"
                  />
                  {errors.attributes?.[index]?.label && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.attributes[index].label.message}
                    </p>
                  )}
                </div>

                {/* Attribute Type */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    {...register(`attributes.${index}.type`, { required: "Type is required." })}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.attributes?.[index]?.type ? "border-red-500" : "border-gray-300"
                    } bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Select type</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="select">Select</option>
                    {/* Add more types as needed */}
                  </select>
                  {errors.attributes?.[index]?.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.attributes[index].type.message}
                    </p>
                  )}
                </div>

                {/* Placeholder (Optional) */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Placeholder
                  </label>
                  <input
                    type="text"
                    {...register(`attributes.${index}.placeholder`)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter placeholder (optional)"
                  />
                </div>

                {/* Tooltip (Optional) */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tooltip
                  </label>
                  <input
                    type="text"
                    {...register(`attributes.${index}.tooltip`)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter tooltip (optional)"
                  />
                </div>

                {/* Validation Rules (Optional) */}
                {/* Implement as needed, e.g., required, min, max, regex */}
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  label: "",
                  type: "",
                  placeholder: "",
                  tooltip: "",
                  options: [],
                  validation: {},
                })
              }
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Attribute
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            } transition-colors`}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
