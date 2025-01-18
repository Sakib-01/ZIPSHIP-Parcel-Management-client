import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";

const AllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: deliveryMen = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-deliveryman");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  console.log(deliveryMen);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">All Delivery Men</h2>

      {/* Responsive Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-center">
          <thead className=" text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-text">
                Delivery Man's Name
              </th>
              <th className="border px-4 py-2 text-text">Phone Number</th>
              <th className="border px-4 py-2 text-text">
                Number of Parcels Delivered
              </th>
              <th className="border px-4 py-2 text-text">Average Review</th>
            </tr>
          </thead>
          <tbody>
            {deliveryMen.map((deliveryMan) => (
              <tr key={deliveryMan._id}>
                <td className="border px-4 py-2 text-text">
                  {deliveryMan.name}
                </td>
                <td className="border px-4 py-2 text-text">
                  {deliveryMan.phone || "N/A"}
                </td>
                <td className="border px-4 py-2 text-text">
                  {deliveryMan.deliveredCount}
                </td>
                <td className="flex justify-center items-center text-yellow-400 border px-4 py-2">
                  <FaStar />
                  <span className="text-black">
                    {deliveryMan.averageRating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliveryMen;
