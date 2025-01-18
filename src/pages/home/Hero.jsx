// Hero.js
import React from "react";
import bannerImage from "../../assets/img/banner.jpg";

const Hero = () => {
  return (
    <div
      className="w-full h-[600px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-center items-start text-white pl-8">
        {/* Heading Text */}
        <div className="w-full md:w-6/12 lg:pl-24">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-[#0e7490] bg-clip-text">
            Fast & Reliable Delivery
          </h1>
          <p className="text-lg lg:text-2xl mb-6 text-black">
            Experience seamless product delivery at your doorstep with speed and
            safety.
          </p>

          {/* Search Bar */}
          <div className="flex">
            <input
              type="text"
              placeholder="Track your delivery, check status, or search products..."
              className="w-full py-3 px-4 rounded-l-full text-black focus:outline-none"
            />
            <button className="py-3 px-6 bg-primary text-white font-bold rounded-r-full hover:bg-opacity-90 transition">
              Track Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
