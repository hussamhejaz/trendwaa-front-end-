import React from 'react';
import { AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai';

const Profile = () => {
  // Simulated user data. Replace with dynamic data as needed.
  const user = {
    fullName: 'محمد أحمد علي',
    email: 'user@example.com',
    phone: '+966 5XX XXX XXX',
    address: 'الرياض، السعودية',
    profileImage: 'https://via.placeholder.com/150', // Replace with user's profile image
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Banner Section */}
      <div className="relative bg-indigo-600 h-48"></div>

      {/* Profile Card Container */}
      <div className="max-w-4xl mx-auto relative -mt-16 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={user.profileImage}
                alt="صورة الملف الشخصي"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
            <h2 className="mt-4 text-2xl font-bold">{user.fullName}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* User Information */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center space-x-reverse space-x-3">
              <AiOutlineMail className="text-indigo-600" size={24} />
              <span className="text-gray-700">{user.email}</span>
            </div>
            <div className="flex items-center space-x-reverse space-x-3">
              <AiOutlinePhone className="text-indigo-600" size={24} />
              <span className="text-gray-700">{user.phone}</span>
            </div>
            <div className="flex items-center space-x-reverse space-x-3">
              <AiOutlineHome className="text-indigo-600" size={24} />
              <span className="text-gray-700">{user.address}</span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8 text-center">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold transition hover:bg-indigo-700">
              تعديل الملف الشخصي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
