import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-12 pb-6" dir="rtl">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap md:flex-nowrap justify-between">
        {/* Company Info */}
        <div className="w-full md:w-1/4 mb-6">
          <h3 className="text-xl font-bold mb-4">تريندوا</h3>
          <p className="text-gray-400">
            وصف مختصر للشركة، هدفها وخدماتها. نسعى لتقديم أفضل المنتجات والخدمات لعملائنا.
          </p>
          <div className="mt-4 flex space-x-reverse space-x-4">
            <Link to="https://facebook.com" className="hover:text-gray-400" aria-label="فيسبوك">
              <FaFacebookF />
            </Link>
            <Link to="https://twitter.com" className="hover:text-gray-400" aria-label="تويتر">
              <FaTwitter />
            </Link>
            <Link to="https://instagram.com" className="hover:text-gray-400" aria-label="إنستغرام">
              <FaInstagram />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/4 mb-6">
          <h4 className="text-lg font-semibold mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/shop" className="hover:text-white transition">المتجر</Link></li>
            <li><Link to="/about" className="hover:text-white transition">من نحن</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">اتصل بنا</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">الأسئلة الشائعة</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="w-full md:w-1/4 mb-6">
          <h4 className="text-lg font-semibold mb-3">الدعم</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/shipping" className="hover:text-white transition">الشحن</Link></li>
            <li><Link to="/returns" className="hover:text-white transition">الإرجاع</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">سياسة الخصوصية</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">الشروط والأحكام</Link></li>
          </ul>
        </div>

        {/*
          The Newsletter Subscription section has been removed as requested.
          If needed in the future, you can re-add it here.
        */}
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} تريندوا. جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
);

export default Footer;
