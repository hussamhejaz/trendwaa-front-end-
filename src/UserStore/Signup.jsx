import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="name">الاسم الكامل</label>
            <input
              id="name"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="أدخل اسمك الكامل"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="email">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="password">كلمة المرور</label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="confirmPassword">تأكيد كلمة المرور</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold transition hover:bg-indigo-700"
          >
            إنشاء حساب
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          هل لديك حساب بالفعل؟ <Link to="/login" className="text-indigo-600 hover:underline">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
