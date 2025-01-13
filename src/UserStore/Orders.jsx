import React from 'react';

const Orders = () => {
  return (
    <div className="container mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold text-right mb-6">طلباتي</h1>
      <p className="text-right text-gray-600 mb-4">هنا ستظهر قائمة الطلبات السابقة الخاصة بك.</p>
      {/* Placeholder for order cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Example Order Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-right">طلب رقم: #12345</h2>
          <p className="text-right text-gray-700">تاريخ الطلب: 2023-01-01</p>
          <p className="text-right text-gray-700">الحالة: تم الشحن</p>
          <a href="/order/12345" className="text-indigo-600 hover:underline block text-right mt-2">
            تفاصيل الطلب
          </a>
        </div>
        {/* More order cards as needed */}
      </div>
    </div>
  );
};

export default Orders;
