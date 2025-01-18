import React from "react";
import { A11y, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaQuoteLeft } from "react-icons/fa";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Customer",
      review:
        "The delivery was super fast! I ordered my items on a Friday, and they arrived the very next day. The packaging was secure, and everything was in perfect condition. Definitely using this service again!",
      image: "https://i.ibb.co/Q97TCY9/review1.jpg",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Customer",
      review:
        "I'm impressed with the updates during the delivery process. I knew exactly when my package would arrive. Great communication and on-time delivery!",
      image: "https://i.ibb.co/8sR07h5/review2.jpg",
    },
    {
      id: 3,
      name: "Charlie Davis",
      role: "Customer",
      review:
        "The website was easy to navigate, and the delivery was smooth. The courier was friendly, and the items arrived without any damage. Excellent experience!",
      image: "https://i.ibb.co/cJ8wMnH/review3.jpg",
    },
    {
      id: 4,
      name: "Diana Moore",
      role: "Customer",
      review:
        "I had a last-minute order, and the express delivery option saved the day! The service was reliable, and my package arrived right on time for my event.",
      image: "https://i.ibb.co/JCNFv7t/review4.jpg",
    },
    {
      id: 5,
      name: "Michael Johnson",
      role: "Customer",
      review:
        "I've used this delivery service multiple times, and it never disappoints. The tracking feature is accurate, and the packages always arrive on time. Highly recommended!",
      image: "https://i.ibb.co/ZcnMB1M/review5.jpg",
    },
  ];

  return (
    <div className="w-11/12 mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-primary text-center mb-12">
        What Our Clients Say
      </h2>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000, // 2 seconds between auto-scroll
          disableOnInteraction: false, // Continue autoplay after manual interaction
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="p-8 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto h-72 bg-white">
              <FaQuoteLeft className="text-red-600 text-3xl mb-4" />
              <p className="text-gray-600 text-sm mb-6">{review.review}</p>
              <div className="flex items-center mt-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
