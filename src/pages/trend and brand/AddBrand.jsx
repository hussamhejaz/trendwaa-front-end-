// src/pages/Brands/AddBrand.jsx
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  // Fetch all brands from the backend
  const fetchBrands = async () => {
    setListLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/brands');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch brands');
      setBrands(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle brand submission
  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!brandName) {
        toast.error('Brand name is required');
        return;
      }

      const formData = new FormData();
      formData.append('name', brandName);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch('http://localhost:5001/api/brands', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to add brand');
      }

      toast.success('Brand added successfully!');
      setBrandName('');
      setImageFile(null);
      fetchBrands(); // Refresh the brand list after adding
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection for brand image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Delete a brand
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;
    try {
      const response = await fetch(`http://localhost:5001/api/brands/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to delete brand');
      toast.success(result.message);
      fetchBrands(); // Refresh the list after deletion
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ToastContainer />

      {/* Page Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Brands Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Brand Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center">
              Add a New Brand
            </h2>
            <form onSubmit={handleBrandSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-600 font-semibold">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Enter brand name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600 font-semibold">Brand Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-600
                            file:mr-4 file:py-2 file:px-4 
                            file:border-0 file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            cursor-pointer"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                          hover:bg-blue-700 transition-colors font-semibold"
              >
                {loading ? 'Adding...' : 'Add Brand'}
              </button>
            </form>
          </div>

          {/* Brands List */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center">
              Existing Brands
            </h2>
            {listLoading ? (
              <p className="text-center text-gray-500">Loading brands...</p>
            ) : brands.length === 0 ? (
              <p className="text-center text-gray-500">No brands available.</p>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {brands.map((brand) => (
                  <div
                    key={brand.id}
                    className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-md p-4
                               transition-colors shadow-sm justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      {brand.image_url && (
                        <img
                          src={brand.image_url}
                          alt={brand.name}
                          className="w-14 h-14 object-cover rounded-md"
                        />
                      )}
                      <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
                    </div>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md
                                 transition-colors font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddBrand;
