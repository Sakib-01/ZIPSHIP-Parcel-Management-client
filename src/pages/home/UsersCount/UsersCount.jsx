import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";

const UsersCount = () => {
  const axiosPublic = useAxiosPublic();
  const { data: numbers = {}, isLoading } = useQuery({
    queryKey: ["numbers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/booked-parcel");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full md:w-8/12 mx-auto relative -top-16 mt-5 bg-secondary border-b-4 rounded-3xl border-primary p-10">
      <div className="grid grid-cols-3 text-center md:text-center md:grid-cols-3 gap-6 md:gap-10 w-full 2xl:pr-28">
        <div>
          <p className="text-4xl text-center font-medium text-text">
            <CountUp
              start={0}
              end={numbers?.parcelNumber || 0}
              duration={2.5}
              separator=","
            />
            +
          </p>
          <p className="text-text text-xl">Booked Parcels</p>
        </div>
        <div>
          <p className="text-4xl text-center font-medium text-text">
            <CountUp
              start={0}
              end={numbers?.parcelDelivered || 0}
              duration={2.5}
              separator=","
            />
            +
          </p>
          <p className="text-text text-xl">Delivered Parcels</p>
        </div>
        <div>
          <p className="text-4xl text-center font-medium text-text">
            <CountUp
              start={0}
              end={numbers?.users || 0}
              duration={2.5}
              separator=","
            />
            +
          </p>
          <p className="text-text text-xl">People using this app</p>
        </div>
      </div>
    </div>
  );
};

export default UsersCount;
