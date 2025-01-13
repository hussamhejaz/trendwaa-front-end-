import React from 'react';

const Messages = () => {
  return (
    <div className="container mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold text-right mb-6">الرسائل</h1>
      <p className="text-right text-gray-600 mb-4">هنا ستجد جميع رسائلك من خدمة العملاء والعروض.</p>
      {/* Placeholder for messages list */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-right">رسالة من فريق الدعم</h2>
          <p className="text-right text-gray-700">شكراً لتواصلك معنا. نحن هنا لمساعدتك...</p>
          <span className="text-sm text-gray-500 block text-right">2023-01-01</span>
        </div>
        {/* More message items as needed */}
      </div>
    </div>
  );
};

export default Messages;
