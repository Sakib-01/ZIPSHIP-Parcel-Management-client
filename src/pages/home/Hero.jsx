// Hero.js
import React from "react";
import bannerImage from "../../assets/img/banner5.jpg";

const Hero = () => {
  return (
    <div
      className="w-full h-[600px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
        {/* Heading Text */}
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          Find Your Perfect Match
        </h1>
        <p className="text-lg lg:text-2xl mb-6">
          Discover tailored recommendations just for you.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for products, categories, or brands..."
            className="w-full py-3 px-4 rounded-l-full text-black focus:outline-none"
          />
          <button className="py-3 px-6 bg-primary text-white font-bold rounded-r-full hover:bg-opacity-90 transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
