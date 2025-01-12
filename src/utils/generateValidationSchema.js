// src/utils/generateValidationSchema.js

import * as yup from 'yup';

/**
 * Generates a Yup validation schema based on selected category attributes.
 *
 * @param {Object} selectedCategoryAttributes - The attributes of the selected category.
 * @param {Array} selectedCategoryAttributes.fields - An array of field objects specific to the category.
 * @returns {Object} - A Yup validation schema object.
 */
export const generateValidationSchema = (selectedCategoryAttributes) => {
  // Define the base schema for general product fields
  const baseSchema = {
    productNumber: yup
      .string()
      .matches(/^P\d+$/, 'Product number must start with "P" followed by digits')
      .required('Product number is required'),
    sku: yup.string().required('SKU is required'),
    name: yup.string().required('Product name is required'),
    category: yup
      .object({
        value: yup.string().required(),
        label: yup.string().required(),
      })
      .required('Category is required'),
    price: yup
      .number()
      .typeError('Price must be a number')
      .positive('Price must be positive')
      .required('Price is required'),
    discountPercentage: yup
      .number()
      .typeError('Discount must be a number')
      .min(0, 'Discount cannot be negative')
      .max(100, 'Discount cannot exceed 100%')
      .nullable(), // Allows null or undefined
    stock: yup
      .number()
      .typeError('Stock quantity must be a number')
      .integer('Stock quantity must be an integer')
      .min(0, 'Stock quantity cannot be negative')
      .required('Stock quantity is required'),
    inventoryAlert: yup
      .number()
      .typeError('Inventory alert threshold must be a number')
      .integer('Inventory alert threshold must be an integer')
      .min(0, 'Inventory alert threshold cannot be negative')
      .nullable(),
    description: yup
      .string()
      .test(
        'is-not-empty',
        'Description cannot be empty.',
        (value) => {
          // Strips HTML tags and checks if there's any non-whitespace character
          return value && value.replace(/<[^>]+>/g, '').trim().length > 0;
        }
      )
      .required('Description is required'),
    tags: yup
      .array()
      .of(yup.string())
      .min(1, 'At least one tag is required.')
      .required('Tags are required'),
    mediaURLs: yup
      .array()
      .of(
        yup
          .string()
          .url('Each media URL must be a valid URL')
          .required('Media URL is required')
      )
      .notRequired(),
    featured: yup.boolean().notRequired(),
  };

  /**
   * Mapping of field types to their corresponding Yup validation schemas.
   * This allows for easy extension and maintenance.
   */
  const fieldTypeSchemas = {
    text: (field) =>
      yup
        .string()
        .trim()
        .required(`${field.label} is required`),
    number: (field) =>
      yup
        .number()
        .typeError(`${field.label} must be a number`)
        .required(`${field.label} is required`),
    select: (field) =>
      yup
        .string()
        .required(`${field.label} is required`),
    'multi-select': (field) =>
      yup
        .array()
        .of(yup.string())
        .min(1, `At least one ${field.label} is required`)
        .required(`${field.label} is required`),
    // Extend with more field type handlers as needed
  };

  // Initialize an empty object to hold category-specific validation schemas
  const categorySchema = {};

  if (
    selectedCategoryAttributes &&
    Array.isArray(selectedCategoryAttributes.fields)
  ) {
    selectedCategoryAttributes.fields.forEach((field) => {
      const validate = fieldTypeSchemas[field.type];
      if (validate) {
        categorySchema[field.name] = validate(field);
      } else {
        console.warn(
          `Unsupported field type "${field.type}" for field "${field.name}".`
        );
      }
    });
  }

  // Combine base schema with category-specific schema
  return yup.object().shape({
    ...baseSchema,
    ...categorySchema,
  });
};
