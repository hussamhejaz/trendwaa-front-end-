// src/pages/Products/EditProduct.jsx

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import MediaUpload from "../../components/MediaUpload";
import DynamicField from "../../components/DynamicField";
import { generateValidationSchema } from "../../utils/productValidationSchema"; // Updated import
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State variables
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [validationSchema, setValidationSchema] = useState(null); // Initialize as null
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Initialize React Hook Form only after validationSchema is set
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: {
      productNumber: "",
      sku: "",
      name: "",
      category: null,
      price: "",
      discountPercentage: "",
      priceAfterDiscount: "",
      stock: "",
      inventoryAlert: "",
      brand: "",
      warranty: "",
      description: "",
      tags: [],
      featured: false,
      media: [],
      mediaURLs: [],
      // Add other category-specific fields as needed
    },
  });

  // Fetch product and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api"}/products/${id}`), // Relative path
          axios.get(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api"}/categories`), // Relative path
        ]);

        const productData = productRes.data.product;
        setProduct(productData);

        // Map categories for react-select
        const categoriesOptions = categoriesRes.data.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }));
        setCategories(categoriesOptions);

        // Set selected category
        const currentCategory = categoriesOptions.find(
          (cat) => cat.value === productData.categoryid
        );
        setSelectedCategory(currentCategory);

        let categoryFields = null;

        // Fetch attributes for the current category
        if (currentCategory) {
          const categoryDetailsRes = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api"}/categories/${currentCategory.value}` // Relative path
          );
          categoryFields = categoryDetailsRes.data.attributes || [];
          setCategoryAttributes(categoryFields);
        }

        // Generate validation schema based on category
        const schema = generateValidationSchema(
          categoryFields ? { fields: categoryFields } : null
        );
        setValidationSchema(schema);

        // Reset form with fetched product data
        reset({
          productNumber: productData.productnumber || "",
          sku: productData.sku || "",
          name: productData.productname || "",
          category: currentCategory || null,
          price: productData.price || "",
          discountPercentage: productData.discountpercentage || "",
          priceAfterDiscount: productData.priceafterdiscount || "",
          stock: productData.stockquantity || "",
          inventoryAlert: productData.inventoryalertthreshold || "",
          brand: productData.brand || "",
          warranty: productData.warranty || "",
          description: productData.description || "",
          tags: productData.tags
            ? productData.tags.map((tag) => ({ value: tag, label: tag }))
            : [],
          featured: productData.isfeatured || false,
          media: productData.mediaurl || [],
          mediaURLs: productData.mediaurl || [], // Populate mediaURLs
          // Populate other fields as needed
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load product data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  // Update the form's validation resolver when validationSchema changes
  useEffect(() => {
    if (validationSchema) {
      // Reset the form with existing values and apply new validation
      reset({}, { keepValues: true, keepErrors: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationSchema]);

  // Watch for changes in price and discount to calculate price after discount
  const watchPrice = watch("price");
  const watchDiscount = watch("discountPercentage");

  useEffect(() => {
    if (watchPrice !== "" && watchDiscount !== "") {
      const discountedPrice =
        parseFloat(watchPrice) -
        (parseFloat(watchPrice) * parseFloat(watchDiscount)) / 100;
      setValue("priceAfterDiscount", discountedPrice.toFixed(2), {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue("priceAfterDiscount", "", { shouldValidate: true, shouldDirty: true });
    }
  }, [watchPrice, watchDiscount, setValue]);

  // Update validation schema when category changes
  useEffect(() => {
    const updateValidationSchema = async () => {
      if (selectedCategory) {
        try {
          const categoryDetailsRes = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api"}/categories/${selectedCategory.value}` // Relative path
          );
          const categoryFields = categoryDetailsRes.data.attributes || [];
          setCategoryAttributes(categoryFields);

          const schema = generateValidationSchema({ fields: categoryFields });
          setValidationSchema(schema);
        } catch (err) {
          console.error("Error fetching category attributes:", err);
          alert("Failed to load category-specific attributes.");
        }
      } else {
        setCategoryAttributes([]);
        const schema = generateValidationSchema(null);
        setValidationSchema(schema);
      }
    };

    updateValidationSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Transform tags from array of objects to array of strings
      const transformedTags = data.tags.map((tag) => tag.value);

      const payload = {
        productNumber: data.productNumber,
        sku: data.sku,
        productName: data.name,
        categoryID: data.category ? data.category.value : null,
        categoryName: data.category ? data.category.label : null,
        price: parseFloat(data.price),
        discountPercentage: parseFloat(data.discountPercentage) || 0,
        priceAfterDiscount: parseFloat(data.priceAfterDiscount) || 0,
        stockQuantity: parseInt(data.stock, 10),
        inventoryAlertThreshold: parseInt(data.inventoryAlert, 10) || 0,
        brand: data.brand,
        warranty: data.warranty,
        description: data.description,
        tags: transformedTags,
        mediaURL: data.mediaURLs || [],
        isFeatured: data.featured,
        // Include other category-specific fields as needed
      };

      // Send PUT request to update the product
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api"}/products/update/${id}`, payload); // Relative path

      if (response.status === 200) {
        alert("Product successfully updated!");
        navigate("/dashboard/products/list"); // Redirect to the products view page
      }
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product. Please try again.");
    }
  };

  // Handle category change
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  // Render category-specific fields
  const renderCategoryFields = () => {
    if (!selectedCategory || categoryAttributes.length === 0) {
      return <p className="text-gray-500">Please select a category to view specific fields.</p>;
    }

    return (
      <>
        {categoryAttributes.map((field) => (
          <div key={field.id} className="mb-6">
            <DynamicField
              field={field}
              control={control}
              errors={errors}
              register={register}
            />
          </div>
        ))}
      </>
    );
  };

  // Navigation between steps
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
      ]);
    } else if (currentStep === 2) {
      const categoryFields = categoryAttributes.map((f) => f.name) || [];
      valid = await trigger(categoryFields);
    } else if (currentStep === 3) {
      valid = await trigger(["description", "tags"]);
    }

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
    if (process.env.NODE_ENV === "development") {
      console.log("Form Errors:", errors);
      console.log("Form Data:", watch());
    }
  }, [errors, watch]);

  // Render Circular Loader
  const CircularLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        aria-label="Loading"
        role="status"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );

  if (loading) {
    return <CircularLoader />;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-start">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>

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
                      : step < currentStep
                      ? "bg-green-300 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

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
                    {...register("productNumber")}
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
                    {...register("sku")}
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
                    {...register("name")}
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
                    {...register("brand")}
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
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                    Warranty Period (Months)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter warranty period"
                    {...register("warranty")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.warranty ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.warranty && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.warranty.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Category</label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categories}
                        placeholder="Select Category"
                        classNamePrefix="react-select"
                        value={selectedCategory}
                        onChange={(value) => {
                          field.onChange(value);
                          handleCategoryChange(value);
                        }}
                        isClearable
                      />
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    {...register("price")}
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
                    step="0.01"
                    placeholder="Enter discount percentage"
                    {...register("discountPercentage")}
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
                    step="0.01"
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
                    {...register("stock")}
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
                    {...register("inventoryAlert")}
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
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      theme="snow"
                      placeholder="Enter product description"
                      onChange={(content, delta, source, editor) => {
                        field.onChange(content);
                      }}
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
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Tags
                </label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={[
                        { value: "New", label: "New" },
                        { value: "Sale", label: "Sale" },
                        { value: "Popular", label: "Popular" },
                        { value: "Limited", label: "Limited" },
                        // Add more tag options as needed
                      ]}
                      placeholder="Select or create tags"
                      classNamePrefix="react-select"
                      value={field.value}
                      onChange={(selected) =>
                        field.onChange(selected ? selected : [])
                      }
                      isClearable
                      isSearchable
                    />
                  )}
                />
                {errors.tags && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tags.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Media Upload and Featured Toggle */}
          {currentStep === 4 && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 space-y-6">
              {/* Media Upload */}
              <MediaUpload control={control} setValue={setValue} errors={errors} />

              {/* Featured Toggle */}
              <div className="flex items-center">
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
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
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
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Update Product
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
