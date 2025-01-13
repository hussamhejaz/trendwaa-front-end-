import React from 'react';

const Coupons = () => {
  return (
    <div className="container mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold text-right mb-6">قسائمي</h1>
      <p className="text-right text-gray-600 mb-4">استعرض القسائم والخصومات المتاحة لك.</p>
      {/* Placeholder for coupon cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Coupon Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">خصم 20%</div>
          <p className="text-gray-700 text-center mb-4">على مشترياتك التالية من قسم الملابس</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full transition hover:bg-indigo-700">
            استخدم القسيمة
          </button>
        </div>
        {/* More coupon cards as needed */}
      </div>
    </div>
  );
};

export default Coupons;
