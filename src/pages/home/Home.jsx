import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./Hero";
import TopDeliveryman from "./TopDeliveryMan/TopDeliveryman";
import UsersCount from "./UsersCount/UsersCount";
import Frature from "./Feature/Frature";
import About from "./About/About";
import Review from "./Review/Review";
import { Helmet } from "react-helmet-async";
import Contact from "./contact/Contact";
// import { Helmet } from "react-helmet-async";

const Home = () => {
  document.title = "ZipShip || Home";
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);
  return (
    <div className="space-y-20">
      <Helmet>
        <title> ZipShip </title>
      </Helmet>
      <div id="home" data-aos="fade-up">
        <Hero />
      </div>
      <div className="relative -top-10" data-aos="fade-up">
        <UsersCount />
      </div>
      <div id="feature" data-aos="fade-right">
        <Frature />
      </div>
      <div id="about" data-aos="fade-left">
        <About />
      </div>
      <div id="dman" data-aos="zoom-in">
        <TopDeliveryman />
      </div>
      <div id="review" data-aos="zoom-in">
        <Review />
      </div>
      <div id="contact" data-aos="zoom-in">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
