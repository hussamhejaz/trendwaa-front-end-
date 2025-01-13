import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ProductDetails = () => {
  const { id } = useParams();
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });
  const [quantity, setQuantity] = useState(1);

  // Simulated product data. Replace with real API fetch.
  const product = {
    id,
    name: 'Sample Product',
    description:
      'This is a detailed description of the product that offers insights and features of the product.',
    price: '₪199',
    images: [
      'https://via.placeholder.com/600x600',
      'https://via.placeholder.com/600x600?text=Image+2',
      'https://via.placeholder.com/600x600?text=Image+3',
    ],
    reviews: [
      { user: 'مستخدم1', comment: 'منتج رائع!', rating: 5 },
      { user: 'مستخدم2', comment: 'جيد ولكن يمكن أن يتحسن.', rating: 4 },
      // ...more reviews
    ],
  };

  const handleAddToWishlist = () => setWishlistAdded(true);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
  };

  return (
    <div className="overflow-y-hidden p-6 bg-white" dir="rtl">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Gallery */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`صورة المنتج ${idx + 1}`}
                  className="object-cover h-24 w-full rounded-md cursor-pointer transition-transform hover:scale-105"
                />
              ))}
            </div>
            <div className="border rounded-md overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-96"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-right">{product.name}</h1>
            <p className="text-right text-gray-600">{product.description}</p>
            <span className="text-2xl font-bold text-right">{product.price}</span>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 space-x-reverse justify-end mb-4">
              <span className="font-semibold">الكمية:</span>
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 space-x-reverse justify-end">
              <button className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:bg-gray-800">
                إضافة للسلة
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`flex items-center bg-pink-500 text-white px-4 py-3 rounded-full text-lg font-semibold transition hover:bg-pink-600 ${
                  wishlistAdded && 'opacity-50 cursor-not-allowed'
                }`}
                disabled={wishlistAdded}
              >
                <AiOutlineHeart className="mr-2" size={24} />
                {wishlistAdded ? 'في قائمة الرغبات' : 'أضف إلى قائمة الرغبات'}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-right">التعليقات</h2>
          <div className="space-y-6">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-right">{review.user}</span>
                  <span className="text-yellow-500">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-right text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improved Feedback Form Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-right">اترك تعليقك</h2>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-right">
            {/* Interactive Star Rating */}
            <div>
              <label className="block mb-1 font-semibold">التقييم:</label>
              <div className="flex items-center space-x-1 space-x-reverse">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setFeedback({ ...feedback, rating: star })}
                    className="focus:outline-none"
                  >
                    {star <= feedback.rating ? (
                      <AiFillStar className="text-yellow-500" size={28} />
                    ) : (
                      <AiOutlineStar className="text-gray-300" size={28} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Textarea */}
            <div>
              <label className="block mb-1 font-semibold">تعليق:</label>
              <textarea
                value={feedback.comment}
                onChange={(e) =>
                  setFeedback({ ...feedback, comment: e.target.value })
                }
                rows="4"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="اكتب تعليقك هنا..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold transition hover:bg-indigo-700"
            >
              إرسال التعليق
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
