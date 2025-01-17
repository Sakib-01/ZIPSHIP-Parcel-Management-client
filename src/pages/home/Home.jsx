import React from "react";
import Hero from "./Hero";
import TopDeliveryman from "./TopDeliveryMan/TopDeliveryman";
import UsersCount from "./UsersCount/UsersCount";
import Frature from "./Feature/Frature";

const Home = () => {
  return (
    <div>
      <Hero />
      <UsersCount />
      <Frature />
      <TopDeliveryman />
    </div>
  );
};

export default Home;
