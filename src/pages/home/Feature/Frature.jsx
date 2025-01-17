import React from "react";
import { FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";
import icon1 from "../../../assets/lottie/Animation1.json";
import icon2 from "../../../assets/lottie/Animation 2.json";
import icon3 from "../../../assets/lottie/Animation3.json";
import Lottie from "lottie-react";

const Frature = () => {
  const features = [
    {
      id: 1,
      //   icon: <FaTruck className="text-5xl text-primary mb-4" />,
      icon: <Lottie className="h-16 w-full" animationData={icon1}></Lottie>,
      title: "Super Fast Delivery",
      description:
        "Get your parcels delivered in record time with our advanced logistics network. We ensure timely delivery for your convenience and peace of mind.",
    },
    {
      id: 2,
      icon: <Lottie className="h-16 w-full" animationData={icon3}></Lottie>,
      //   icon: <FaShieldAlt className="text-5xl text-primary mb-4" />,
      title: "100% Safe Delivery",
      description:
        "Your packages are our responsibility. From packaging to delivery, we prioritize safety to guarantee your items arrive in perfect condition.",
    },
    {
      id: 3,
      icon: <Lottie className="h-16 w-full" animationData={icon2}></Lottie>,
      //   icon: <FaHeadset className="text-5xl text-primary mb-4" />,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any queries or issues related to your deliveries.",
    },
  ];

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white p-6 rounded-lg shadow-lg text-center  border-primary"
          >
            <div className="w-full h-20 ">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frature;
