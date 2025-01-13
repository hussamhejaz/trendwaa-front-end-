import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { name: 'ملابس نسائية', path: '/women' },
    { name: 'الصحة و الجمال', path: '/beauty' },
    { name: 'المنزل والمطبخ', path: '/home-kitchen' },
    { name: 'مجوهرات واكسسوارات', path: '/jewelry-accessories' },
  ];

  // Effect to handle clicks outside the account dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Effect to handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutsideMobile = (event) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle mobile menu"]')
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideMobile);
    return () =>
      document.removeEventListener('mousedown', handleClickOutsideMobile);
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white text-black sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Top Row: Search and Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3 border-b border-gray-300">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md mb-2 md:mb-0">
            <input
              type="text"
              placeholder="ابحث عن منتجات..."
              className="bg-white text-black text-right rounded-full pl-4 pr-12 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-black">
              <FiSearch size={24} />
            </div>
          </div>

          {/* Icons with Currency Dropdown and Account/Wishlist/Cart Icons */}
          <div className="flex items-center space-x-reverse space-x-4">
            {/* Currency Dropdown */}
            <div className="relative">
              <select
                className="bg-white text-black rounded-full pl-4 pr-8 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none"
              >
                <option value="aed">AED</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
            </div>

            {/* Account Icon with Styled Dropdown */}
            <div className="relative" ref={accountDropdownRef}>
              <button
                onClick={() => setAccountDropdownOpen((prev) => !prev)}
                className="hover:text-gray-600 transition focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A11 11 0 0112 15a11 11 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48">
                  {/* Arrow Pointer */}
                  <div className="absolute top-0 right-6 w-3 h-3 bg-white transform rotate-45 -mt-1 border-t border-l border-gray-200"></div>
                  <div className="bg-white border border-gray-200 shadow-lg rounded-md transition ease-out duration-200">
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 text-black text-right"
                      onClick={() => setAccountDropdownOpen(false)}
                    >
                      تسجيل الدخول / حسابي
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100 text-black text-right"
                      onClick={() => setAccountDropdownOpen(false)}
                    >
                      طلباتي
                    </Link>
                    <Link
                      to="/coupons"
                      className="block px-4 py-2 hover:bg-gray-100 text-black text-right"
                      onClick={() => setAccountDropdownOpen(false)}
                    >
                      قسائمي
                    </Link>
                    <Link
                      to="/messages"
                      className="block px-4 py-2 hover:bg-gray-100 text-black text-right"
                      onClick={() => setAccountDropdownOpen(false)}
                    >
                      الرسائل
                    </Link>
                    <Link
                      to="/points"
                      className="block px-4 py-2 hover:bg-gray-100 text-black text-right"
                      onClick={() => setAccountDropdownOpen(false)}
                    >
                      النقاط
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="hover:text-gray-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="hover:text-gray-600 transition relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m12-9l2 9m-3-9a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-300 rounded-full text-xs w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>

        {/* Second Row: Logo, Hamburger, and Navigation Links */}
        <div className="flex items-center justify-between py-3 border-b border-gray-300">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-black">
              تريندوا
            </Link>
          </div>
          <div className="md:hidden">
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 transition"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          <ul className="hidden md:flex space-x-reverse space-x-6">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="hover:text-gray-600 transition">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden border-b border-gray-300 pb-4">
            <ul className="flex flex-col space-y-2 mt-2">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-200 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
