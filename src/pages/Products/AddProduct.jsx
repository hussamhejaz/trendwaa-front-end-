// src/pages/Products/AddProduct.jsx

import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable'; // Correct import
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MediaUpload from "../../components/MediaUpload";
import DynamicField from "../../components/DynamicField";
import useAddProductForm from "../../hooks/useAddProductForm";

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [loadingAttributes, setLoadingAttributes] = useState(false);
  const [attributesError, setAttributesError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useAddProductForm(selectedCategory, categoryAttributes);

  // Fetch categories from backend (only id and name)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const formattedCategories = data.map((category) => ({
          value: category.id, // Corrected field name
          label: category.name, // Corrected field name
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoriesError('Failed to load categories');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch attributes when a category is selected
  useEffect(() => {
    const fetchAttributes = async (categoryId) => {
      setLoadingAttributes(true);
      setAttributesError(null);
      try {
        const response = await fetch(`http://localhost:5001/api/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category attributes');
        }
        const data = await response.json();
        const attributes = data.attributes.map((ca) => ({
          id: ca.attribute_id,
          name: ca.name,
          label: ca.label,
          type: ca.type,
          placeholder: ca.placeholder,
          tooltip: ca.tooltip,
          options: ca.options || [], // Handle select options if any
          validation_rules: ca.validation_rules || {},
        }));
        setCategoryAttributes(attributes);
      } catch (error) {
        console.error('Error fetching attributes:', error);
        setAttributesError('Failed to load category attributes');
      } finally {
        setLoadingAttributes(false);
      }
    };

    if (selectedCategory) {
      fetchAttributes(selectedCategory.value);
    } else {
      setCategoryAttributes([]);
    }
  }, [selectedCategory]);

  // Watch for discount percentage and price to calculate price after discount
  const watchPrice = watch("price");
  const watchDiscount = watch("discountPercentage");

  useEffect(() => {
    // Calculate price after discount
    if (watchPrice && watchDiscount) {
      const discountedPrice =
        parseFloat(watchPrice) -
        (parseFloat(watchPrice) * parseFloat(watchDiscount)) / 100;
      setValue("priceAfterDiscount", discountedPrice.toFixed(2), {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue("priceAfterDiscount", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [watchPrice, watchDiscount, setValue]);

const onSubmit = async (data) => {
  setSubmitting(true);
  setSubmitError(null);
  setSubmitSuccess(null);
  try {
    // Prepare the payload without priceAfterDiscount
    const payload = {
      productNumber: data.productNumber,
      sku: data.sku,
      productName: data.name, // Mapped correctly
      categoryID: selectedCategory ? parseInt(selectedCategory.value, 10) : null,
      categoryName: selectedCategory ? selectedCategory.label : null,
      price: parseFloat(data.price),
      discountPercentage: parseFloat(data.discountPercentage) || 0,
      stockQuantity: parseInt(data.stock, 10),
      inventoryAlertThreshold: parseInt(data.inventoryAlert, 10) || 0,
      description: data.description,
      tags: data.tags,
      mediaURL: data.mediaURLs.filter(url => typeof url === 'string' && url.length > 0),
      isFeatured: data.featured,
      brand: data.brand,
      warranty: data.warrantyPeriod,
      // Add category-specific attributes
      attributes: categoryAttributes.reduce((acc, attr) => {
        acc[attr.name] = data[attr.name] || null;
        return acc;
      }, {}),
    };

    console.log('Submitting payload:', payload); // Debugging

    // Send the payload to the backend using the correct API endpoint
    const response = await fetch('http://localhost:5001/api/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errors) {
        const validationErrors = errorData.errors.map(err => err.msg).join(', ');
        throw new Error(validationErrors);
      } else {
        throw new Error(errorData.error || 'Failed to add product.');
      }
    }

    const result = await response.json();
    setSubmitSuccess(result.message || 'Product added successfully!');
    toast.success(result.message || 'Product added successfully!');  // <-- Added toast here

    reset(); // Reset the form
    setSelectedCategory(null);
    setCategoryAttributes([]);
    setCurrentStep(1);
  } catch (error) {
    console.error('Error submitting product:', error);
    setSubmitError(error.message);
    toast.error(error.message || 'An error occurred while adding the product.');  // Optional: toast for errors
  } finally {
    setSubmitting(false);
  }
};


  const renderCategoryFields = () => {
    if (!selectedCategory) {
      return <p className="text-gray-500">Please select a category to view specific fields.</p>;
    }

    if (loadingAttributes) {
      return <p className="text-gray-500">Loading attributes...</p>;
    }

    if (attributesError) {
      return <p className="text-red-500">Error: {attributesError}</p>;
    }

    if (categoryAttributes.length === 0) {
      return <p className="text-gray-500">No attributes available for this category.</p>;
    }

    return (
      <>
        {categoryAttributes.map((attr) => (
          <div key={attr.id} className="mb-6">
            <DynamicField
              field={attr}
              control={control}
              errors={errors}
              setValue={setValue}
              register={register}
            />
          </div>
        ))}
      </>
    );
  };

  const nextStep = async () => {
    let valid = false;
    if (currentStep === 1) {
      valid = await trigger([
        "productNumber",
        "sku",
        "name",
        "category",
        "price",
        "discountPercentage",
        "stock",
        "inventoryAlert",
        "brand",
        "warrantyPeriod",
      ]);
    } else if (currentStep === 2) {
      // Validate all category-specific fields
      const categoryFields = categoryAttributes.map((attr) => attr.name);
      valid = await trigger(categoryFields);
    } else if (currentStep === 3) {
      valid = await trigger(["description", "tags"]);
    }
    console.log(`Validation for step ${currentStep}:`, valid);
    console.log("Errors:", errors);
    if (valid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      alert("Please fill out all required fields before moving to the next step.");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Debugging: Log form state
  useEffect(() => {
    console.log("Form Errors:", errors);
    console.log("Form Data:", watch());
  }, [errors, watch]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-start">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h2>
        <ToastContainer />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Step Indicators */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === step
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Success and Error Messages */}
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              {submitSuccess}
            </div>
          )}
          {submitError && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {submitError}
            </div>
          )}

          {/* Step 1: General Information */}
          {currentStep === 1 && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">General Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Number */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                    Product Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product number"
                    {...register("productNumber", {
                      required: "Product Number is required.",
                      pattern: {
                        value: /^P\d+$/,
                        message: 'Product number must start with "P" followed by digits',
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.productNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.productNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.productNumber.message}
                    </p>
                  )}
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">SKU</label>
                  <input
                    type="text"
                    placeholder="Enter SKU"
                    {...register("sku", { required: "SKU is required." })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.sku ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.sku && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sku.message}
                    </p>
                  )}
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    {...register("name", { required: "Product Name is required." })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Brand</label>
                  <input
                    type="text"
                    placeholder="Enter brand name"
                    {...register("brand", { required: "Brand is required." })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.brand ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.brand && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.brand.message}
                    </p>
                  )}
                </div>

                {/* Warranty Period */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Warranty Period (Months)</label>
                  <input
                    type="number"
                    placeholder="Enter warranty period"
                    {...register("warrantyPeriod", {
                      required: "Warranty Period is required.",
                      min: { value: 0, message: "Warranty Period cannot be negative." },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.warrantyPeriod ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.warrantyPeriod && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.warrantyPeriod.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Category</label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categories}
                        placeholder="Select Category"
                        classNamePrefix="react-select"
                        isLoading={loadingCategories}
                        isDisabled={loadingCategories || categoriesError}
                        onChange={(value) => {
                          field.onChange(value);
                          setSelectedCategory(value);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                  {categoriesError && (
                    <p className="text-red-500 text-sm mt-1">
                      {categoriesError}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Price ($)</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    step="0.01"
                    {...register("price", {
                      required: "Price is required.",
                      min: { value: 0, message: "Price cannot be negative." },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Discount Percentage */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter discount percentage"
                    {...register("discountPercentage", {
                      min: { value: 0, message: "Discount cannot be negative." },
                      max: { value: 100, message: "Discount cannot exceed 100%." },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.discountPercentage ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.discountPercentage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.discountPercentage.message}
                    </p>
                  )}
                </div>

                {/* Price After Discount */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                    Price After Discount ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Price after discount"
                    {...register("priceAfterDiscount")}
                    readOnly
                    className={`w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed`}
                  />
                  {errors.priceAfterDiscount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.priceAfterDiscount.message}
                    </p>
                  )}
                </div>

                {/* Stock Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    {...register("stock", {
                      required: "Stock Quantity is required.",
                      min: { value: 0, message: "Stock cannot be negative." },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.stock ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.stock.message}
                    </p>
                  )}
                </div>

                {/* Inventory Alert */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                    Inventory Alert Threshold
                  </label>
                  <input
                    type="number"
                    placeholder="Enter stock alert threshold"
                    {...register("inventoryAlert", {
                      min: { value: 0, message: "Inventory Alert cannot be negative." },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.inventoryAlert ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.inventoryAlert && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.inventoryAlert.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Category-Specific Fields */}
          {currentStep === 2 && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Category-Specific Fields
              </h3>
              {renderCategoryFields()}
            </div>
          )}

          {/* Step 3: Description and Tags */}
          {currentStep === 3 && (
            <>
              {/* Description */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Description
                </h3>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required." }}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      theme="snow"
                      placeholder="Enter product description"
                      className={`h-40 ${
                        errors.description ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Tags</h3>
                <Controller
                  name="tags"
                  control={control}
                  rules={{ required: "At least one tag is required." }}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      options={[
                        { value: "New", label: "New" },
                        { value: "Sale", label: "Sale" },
                        { value: "Popular", label: "Popular" },
                        { value: "Limited", label: "Limited" },
                      ]}
                      placeholder="Select or create tags"
                      classNamePrefix="react-select"
                      value={field.value.map((tag) => ({
                        value: tag,
                        label: tag,
                      }))}
                      onChange={(selected) =>
                        field.onChange(selected ? selected.map((option) => option.value) : [])
                      }
                    />
                  )}
                />
                {errors.tags && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tags.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Step 4: Media Upload and Featured Toggle */}
          {currentStep === 4 && (
            <>
              {/* Media Upload */}
              <MediaUpload setValue={setValue} errors={errors} />

              {/* Featured Toggle */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  {...register("featured")}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Mark as Featured
                </label>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                onClick={prevStep}
              >
                Previous
              </button>
            )}
            {currentStep < 4 && (
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={nextStep}
              >
                Next
              </button>
            )}
            {currentStep === 4 && (
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200"
                  onClick={() => {
                    reset();
                    setSelectedCategory(null);
                    setCategoryAttributes([]);
                    setCurrentStep(1);
                  }}
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
