import React from 'react';
import { Link } from 'react-router-dom';

const JewelryAccessories = () => {
  return (
    <div className="font-sans text-gray-800 p-4" dir="rtl">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-right">مجوهرات واكسسوارات</h1>
        <p className="text-right mb-8">
          استعرض مجموعتنا الواسعة من المجوهرات والاكسسوارات الفاخرة التي تضيف لمسة أناقة وجاذبية إلى إطلالتك.
        </p>
        
        {/* Choices Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-right mb-4">اختر الفئة:</h2>
          <div className="flex flex-wrap justify-start gap-4">
          <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              كل المنتجات
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              ساعات
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              نظارات
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              قلائد
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              أساور
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              خواتم
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              أقراط
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              أطواق
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              حلي رأس
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              أربطة
            </button>
            {/* Add more buttons as needed */}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, idx) => (
            <Link to={`/product/${idx + 1}`} key={idx}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group">
                <img 
                  src="https://via.placeholder.com/300x300" 
                  alt={`المنتج ${idx + 1}`} 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-right">اسم المنتج</h3>
                  <p className="text-gray-700 text-right mb-4">وصف مختصر للمنتج</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-black">₪99</span>
                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm transition hover:bg-gray-800">
                      إضافة للسلة
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/shop" 
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:bg-gray-800"
          >
            تسوق المزيد
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JewelryAccessories;
