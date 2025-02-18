import React from "react";

const Contact = () => {
  return (
    <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between gap-10 py-10">
      {/* Contact Information Section */}
      <div className="flex-grow w-10/12 space-y-5">
        <h1 className="text-primary text-5xl font-semibold text-start">
          Get in Touch with Us
        </h1>
        <p className="text-text text-xl text-start">
          Need assistance with your parcel delivery? Contact us for quick
          support and reliable service. We're here to ensure your packages reach
          their destination safely and on time.
        </p>
        <div className="text-lg text-text space-y-2">
          <p>
            <strong>📍 Address:</strong> 123 Parcel Lane, Dhaka, Bangladesh
          </p>
          <p>
            <strong>📞 Phone:</strong> +880 1234 567 890
          </p>
          <p>
            <strong>📧 Email:</strong> support@parcelexpress.com
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="flex-grow md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-5">
          Send Us a Message
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="4"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
