import React from "react";

const UsersCount = () => {
  return (
    <div className=" w-8/12 mx-auto relative -top-20 mt-5 bg-secondary border-b-4 rounded-3xl border-primary p-10">
      <div
        className="grid grid-cols-3  text-center
         md:text-center md:grid-cols-3 gap-6 md:gap-10 w-full 2xl:pr-28"
      >
        <div>
          <p className=" text-4xl text-center font-medium text-text">10+</p>
          <p className="text-text text-xl">Booked Parcels </p>
        </div>
        <div>
          <p className=" text-4xl text-center font-medium text-text">10+</p>
          <p className="text-text text-xl">Delivered Parcels </p>
        </div>
        <div>
          <p className=" text-4xl text-center font-medium text-text">10+</p>
          <p className="text-text text-xl">People using this app </p>
        </div>
      </div>
    </div>
  );
};

export default UsersCount;
