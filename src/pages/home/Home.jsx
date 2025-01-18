import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./Hero";
import TopDeliveryman from "./TopDeliveryMan/TopDeliveryman";
import UsersCount from "./UsersCount/UsersCount";
import Frature from "./Feature/Frature";
import About from "./About/About";
import Review from "./Review/Review";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);
  return (
    <div className="space-y-20">
      <div data-aos="fade-up">
        <Hero />
        <UsersCount />
      </div>
      <div data-aos="fade-right">
        <Frature />
      </div>
      <div data-aos="fade-left">
        <About />
      </div>
      <div data-aos="zoom-in">
        <TopDeliveryman />
      </div>
      <div data-aos="zoom-in">
        <Review />
      </div>
    </div>
  );
};

export default Home;
