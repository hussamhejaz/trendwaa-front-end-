import React from 'react';

const Points = () => {
  return (
    <div className="container mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold text-right mb-6">النقاط</h1>
      <p className="text-right text-gray-600 mb-4">استعرض مجموع النقاط الخاصة بك وكيفية استخدامها.</p>
      {/* Placeholder for points information */}
      <div className="bg-white p-6 rounded-lg shadow-md text-right">
        <p className="text-xl font-semibold mb-2">مجموع النقاط: 1200 نقطة</p>
        <p className="text-gray-700">يمكنك استخدام النقاط للحصول على خصومات وعروض خاصة.</p>
      </div>
    </div>
  );
};

export default Points;
