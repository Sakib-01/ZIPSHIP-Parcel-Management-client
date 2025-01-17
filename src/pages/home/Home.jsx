import React from "react";
import Hero from "./Hero";
import TopDeliveryman from "./TopDeliveryMan/TopDeliveryman";
import UsersCount from "./UsersCount/UsersCount";

const Home = () => {
  return (
    <div>
      <Hero />
      <UsersCount />
      <TopDeliveryman />
    </div>
  );
};

export default Home;
