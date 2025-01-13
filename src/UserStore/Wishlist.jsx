import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-right mb-6">قائمة الرغبات</h1>
      <p className="text-right mb-4">
        لا توجد منتجات في قائمة الرغبات بعد.
      </p>
      {/* Future implementation: List of wishlist products */}
      <div className="text-center mt-8">
        <Link 
          to="/shop" 
          className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:bg-gray-800"
        >
          تصفح المنتجات
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
