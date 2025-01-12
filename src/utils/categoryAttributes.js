// src/utils/categoryAttributes.js

export const categoryAttributes = {
  Electronics: {
    fields: [
      {
        name: "brand",
        label: "Brand",
        type: "text",
        placeholder: "Enter brand name",
        tooltip: "Manufacturer or brand of the electronic product.",
      },
      {
        name: "warrantyPeriod",
        label: "Warranty Period (Months)",
        type: "number",
        placeholder: "Enter warranty period",
        tooltip: "Duration of the warranty in months.",
      },
      {
        name: "sku",
        label: "SKU",
        type: "text",
        placeholder: "Enter SKU",
        tooltip: "Unique Stock Keeping Unit identifier.",
      },
    ],
    validation: {
      brand: {
        type: "text",
        required: "Brand is required.",
      },
      warrantyPeriod: {
        type: "number",
        required: "Warranty period is required.",
        min: { value: 0, message: "Cannot be negative." },
        integer: "Must be an integer.",
      },
      sku: {
        type: "text",
        required: "SKU is required.",
        // unique: "SKU must be unique.", // Removed backend dependency
      },
    },
  },
  Clothing: {
    fields: [
      {
        name: "sizes",
        label: "Sizes",
        type: "multi-select",
        options: ["XS", "S", "M", "L", "XL", "XXL"],
        placeholder: "Select sizes",
        tooltip: "Available sizes for the clothing item.",
      },
      {
        name: "colors",
        label: "Colors",
        type: "multi-select",
        options: ["Red", "Blue", "Green", "Black", "White", "Yellow"],
        placeholder: "Select colors",
        tooltip: "Available colors for the clothing item.",
      },
      {
        name: "material",
        label: "Material",
        type: "text",
        placeholder: "Enter material",
        tooltip: "Material composition of the clothing item.",
      },
      {
        name: "sku",
        label: "SKU",
        type: "text",
        placeholder: "Enter SKU",
        tooltip: "Unique Stock Keeping Unit identifier.",
      },
    ],
    validation: {
      sizes: {
        type: "multi-select",
        required: "At least one size is required.",
        options: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      colors: {
        type: "multi-select",
        required: "At least one color is required.",
        options: ["Red", "Blue", "Green", "Black", "White", "Yellow"],
      },
      material: {
        type: "text",
        required: "Material is required.",
      },
      sku: {
        type: "text",
        required: "SKU is required.",
        // unique: "SKU must be unique.", // Removed backend dependency
      },
    },
  },
  Shoes: {
    fields: [
      {
        name: "sizes",
        label: "Sizes",
        type: "multi-select",
        options: ["6", "7", "8", "9", "10", "11", "12"],
        placeholder: "Select shoe sizes",
        tooltip: "Available sizes for the shoes.",
      },
      {
        name: "colors",
        label: "Colors",
        type: "multi-select",
        options: ["Black", "White", "Brown", "Grey", "Blue", "Red"],
        placeholder: "Select colors",
        tooltip: "Available colors for the shoes.",
      },
      {
        name: "material",
        label: "Material",
        type: "text",
        placeholder: "Enter material",
        tooltip: "Material composition of the shoes.",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Men", "Women", "Unisex"],
        placeholder: "Select gender",
        tooltip: "Intended gender for the shoes.",
      },
      {
        name: "sku",
        label: "SKU",
        type: "text",
        placeholder: "Enter SKU",
        tooltip: "Unique Stock Keeping Unit identifier.",
      },
    ],
    validation: {
      sizes: {
        type: "multi-select",
        required: "At least one size is required.",
        options: ["6", "7", "8", "9", "10", "11", "12"],
      },
      colors: {
        type: "multi-select",
        required: "At least one color is required.",
        options: ["Black", "White", "Brown", "Grey", "Blue", "Red"],
      },
      material: {
        type: "text",
        required: "Material is required.",
      },
      gender: {
        type: "select",
        required: "Gender is required.",
        options: ["Men", "Women", "Unisex"],
      },
      sku: {
        type: "text",
        required: "SKU is required.",
        // unique: "SKU must be unique.", // Removed backend dependency
      },
    },
  },
  Accessories: {
    fields: [
      {
        name: "type",
        label: "Type",
        type: "select",
        options: ["Belt", "Hat", "Scarf", "Wallet", "Jewelry"],
        placeholder: "Select accessory type",
        tooltip: "Type of accessory.",
      },
      {
        name: "material",
        label: "Material",
        type: "text",
        placeholder: "Enter material",
        tooltip: "Material composition of the accessory.",
      },
      {
        name: "color",
        label: "Color",
        type: "text",
        placeholder: "Enter color",
        tooltip: "Color of the accessory.",
      },
      {
        name: "sku",
        label: "SKU",
        type: "text",
        placeholder: "Enter SKU",
        tooltip: "Unique Stock Keeping Unit identifier.",
      },
    ],
    validation: {
      type: {
        type: "select",
        required: "Accessory type is required.",
        options: ["Belt", "Hat", "Scarf", "Wallet", "Jewelry"],
      },
      material: {
        type: "text",
        required: "Material is required.",
      },
      color: {
        type: "text",
        required: "Color is required.",
      },
      sku: {
        type: "text",
        required: "SKU is required.",
        // unique: "SKU must be unique.", // Removed backend dependency
      },
    },
  },
  Glasses: {
    fields: [
      {
        name: "lensType",
        label: "Lens Type",
        type: "select",
        options: ["Single Vision", "Bifocal", "Progressive"],
        placeholder: "Select lens type",
        tooltip: "Type of lenses for the glasses.",
      },
      {
        name: "frameMaterial",
        label: "Frame Material",
        type: "text",
        placeholder: "Enter frame material",
        tooltip: "Material of the glasses frame.",
      },
      {
        name: "color",
        label: "Color",
        type: "text",
        placeholder: "Enter color",
        tooltip: "Color of the glasses.",
      },
      {
        name: "sku",
        label: "SKU",
        type: "text",
        placeholder: "Enter SKU",
        tooltip: "Unique Stock Keeping Unit identifier.",
      },
    ],
    validation: {
      lensType: {
        type: "select",
        required: "Lens type is required.",
        options: ["Single Vision", "Bifocal", "Progressive"],
      },
      frameMaterial: {
        type: "text",
        required: "Frame material is required.",
      },
      color: {
        type: "text",
        required: "Color is required.",
      },
      sku: {
        type: "text",
        required: "SKU is required.",
        // unique: "SKU must be unique.", // Removed backend dependency
      },
    },
  },
};
