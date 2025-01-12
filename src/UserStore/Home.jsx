import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Trends Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">الصيحات الجديدة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {/* Example Trending Items */}
            {[...Array(8)].map((_, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group"
              >
                <img 
                  src="https://via.placeholder.com/300x300" 
                  alt={`Trend ${idx + 1}`} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-right">صيحة {idx + 1}</h3>
                  <button className="bg-black text-white px-4 py-2 rounded-full text-sm transition hover:bg-gray-800">
                    اكتشف المزيد
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brands Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">علامات تجارية</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
            {/* Example Brand Logos */}
            {[...Array(6)].map((_, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src="https://via.placeholder.com/150x80" 
                  alt={`Brand ${idx + 1}`} 
                  className="object-contain h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">الفئات المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/category/women" className="relative group block bg-white overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://via.placeholder.com/500x300" 
                alt="نساء" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-semibold">نساء</span>
              </div>
            </Link>
            <Link to="/category/men" className="relative group block bg-white overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://via.placeholder.com/500x300" 
                alt="رجال" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-semibold">رجال</span>
              </div>
            </Link>
            <Link to="/category/kids" className="relative group block bg-white overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://via.placeholder.com/500x300" 
                alt="أطفال" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-semibold">أطفال</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">منتجات مميزة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Product Card Example */}
            {[...Array(8)].map((_, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group"
              >
                <img 
                  src="https://via.placeholder.com/300x300" 
                  alt="Product" 
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
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/shop" 
              className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:bg-gray-800"
            >
              عرض المزيد
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">ماذا يقول عملاؤنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"أفضل متجر تسوق عبر الإنترنت! جودة عالية وخدمة ممتازة."</p>
              <div className="text-right font-semibold">— عميل سعيد</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"تشكيلة رائعة وسهولة في الطلب. تجربة رائعة."</p>
              <div className="text-right font-semibold">— متسوق منتظم</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"التوصيل السريع والمنتجات المميزة. أنصح الجميع!"</p>
              <div className="text-right font-semibold">— عميل مميز</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
