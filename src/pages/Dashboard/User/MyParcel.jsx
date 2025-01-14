import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Link } from "react-router-dom";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myParcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-parcel/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>

      {/* Responsive Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2">Parcel Type</th>
              <th className="border px-4 py-2">Requested Delivery Date</th>
              <th className="border px-4 py-2">Approximate Delivery Date</th>
              <th className="border px-4 py-2">Booking Date</th>
              <th className="border px-4 py-2">Delivery Man ID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="border px-4 py-2">{parcel.parcelType}</td>
                <td className="border px-4 py-2">{parcel.deliveryDate}</td>
                <td className="border px-4 py-2">
                  {parcel.approximateDeliveryDate || "soon"}
                </td>
                <td className="border px-4 py-2">
                  {new Date(parcel.bookingDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {parcel.deliveryManId || "Not Assigned"}
                </td>
                <td className="border px-4 py-2">{parcel.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Link
                    to={`/dashboard/update-parcel/${parcel._id}`}
                    className={`bg-blue-500 text-white px-2 py-1 rounded ${
                      parcel.status !== "pending" &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      if (parcel.status !== "pending") e.preventDefault();
                    }}
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:bg-gray-300"
                    disabled={parcel.status !== "pending"}
                  >
                    Cancel
                  </button>
                  {parcel.status === "delivered" && (
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
