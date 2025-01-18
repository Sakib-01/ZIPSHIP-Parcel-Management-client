import React from "react";
import Hero from "./Hero";
import TopDeliveryman from "./TopDeliveryMan/TopDeliveryman";
import UsersCount from "./UsersCount/UsersCount";
import Frature from "./Feature/Frature";
import About from "./About/About";
import Review from "./Review/Review";

const Home = () => {
  return (
    <div className="space-y-20">
      <div>
        <Hero />
        <UsersCount />
      </div>
      <div>
        <Frature />
      </div>
      <div>
        <About />
      </div>
      <div>
        <TopDeliveryman />
      </div>
      <div>
        <Review />
      </div>
    </div>
  );
};

export default Home;
