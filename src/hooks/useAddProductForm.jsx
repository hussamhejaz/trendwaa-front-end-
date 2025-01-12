import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { generateValidationSchema } from '../utils/generateValidationSchema';

const useAddProductForm = (selectedCategory) => {
  const schema = generateValidationSchema(selectedCategory);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productNumber: '',
      sku: '',
      name: '',
      category: null,
      price: '',
      discountPercentage: '',
      // priceAfterDiscount: '', // Removed
      stock: '',
      inventoryAlert: '',
      media: [],
      mediaURLs: [], // Initialize as empty array
      description: '',
      tags: [],
      featured: false,
      brand: '',
      warrantyPeriod: '',
      // category-specific fields will be dynamically handled
    },
  });

  return form;
};

export default useAddProductForm;
