import { useQuery } from "@tanstack/react-query";

import React from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TopDeliveryman = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: deliveryman = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["deliveryman"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-deliverymen");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  console.log(deliveryman);
  return (
    <div>
      <div className="w-11/12 mx-auto  mb-10">
        <h2 className="text-2xl font-bold text-center mb-5">Top Deliverymen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveryman.map((man) => (
            <div
              key={man.deliveryManId}
              className="bg-white p-4 rounded-lg shadow-lg text-center relative"
            >
              <div className="absolute top-0 left-0  w-28 h-24 border-t-4 border-l-4 border-primary"></div>
              <div className="absolute top-0 right-0  w-28 h-24 border-t-4 border-r-4 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-28 h-24 border-b-4 border-r-4 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-28 h-24 border-b-4 border-l-4 border-primary"></div>

              <img
                src={man.image}
                alt={man.name}
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h3 className="text-lg font-semibold mt-3">{man.name}</h3>
              <p className="text-gray-600">
                Parcels Delivered: {man.totalReviews}
              </p>
              <p className="text-yellow-500">
                ⭐ {man.averageRating.toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryman;
