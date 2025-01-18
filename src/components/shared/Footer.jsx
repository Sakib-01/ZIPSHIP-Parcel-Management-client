import React from "react";
import playstore from "../../assets/img/Google_Play_Store.png";
import appstore from "../../assets/img/App-Store.png";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from "../../assets/img/logo1.webp";
import logo2 from "../../assets/img/logo2.webp";

const Footer = () => {
  return (
    <footer className="bg-background py-20">
      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 ">
        {/* Logo and App Section */}
        <div className="flex flex-col justify-center items-center text-start">
          <img className="w-20 h-20" src={logo} alt="" />
          <h1 className="text-2xl font-bold text-primary">ZipShip</h1>
          <p className="mt-2 text-text">
            Download our app for the fastest solutions
          </p>
          <div className="flex justify-start gap-5 items-center">
            <img
              src={playstore}
              alt="Get it on Google Play"
              className="mt-4 w-32"
            />
            <img
              src={appstore}
              alt="Get it on App Store"
              className="mt-4 w-32"
            />
          </div>
        </div>

        {/* Important Links */}
        {/* <div className="flex flex-col justify-center items-center text-start">
          <h2 className="text-lg font-semibold mb-4">Important Links</h2>
          <ul className="space-y-2 text-text">
            <li>Courier</li>
            <li>Enterprise</li>
            <li>Coverage Area</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
          </ul>
        </div> */}

        {/* How to Reach Us */}
        <div className="flex flex-col justify-center items-center text-start">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            How to Reach Us
          </h2>
          <ul className="space-y-2 text-text">
            <li>123 Dhaka Bangladesh</li>
            <li>09100010000</li>
            <li>contact@gmail.com.bd</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col justify-center items-center text-start">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Get Connected
          </h2>
          <div className="flex space-x-4 mb-4">
            <a
              href="#"
              className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full hover:bg-accent text-text"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full hover:bg-accent text-text"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full hover:bg-accent text-text"
            >
              <FaYoutube />{" "}
            </a>
          </div>
          <p className="text-sm text-text">©2025. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
