import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isParcelLoading, setIsParcelLoading] = useState(true);
  // Fetch user data
  useEffect(() => {
    if (user?.email) {
      const fetchUserData = async () => {
        try {
          const res = await axiosSecure.get(`/user/${user?.email}`);
          setUserData(res.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user?.email]);

  // Fetch Parcels once we have the user _id
  useEffect(() => {
    if (userData?._id) {
      const fetchParcels = async () => {
        try {
          const res = await axiosSecure.get(`/myParcel/${userData._id}`);
          setParcels(res.data);
          setIsParcelLoading(false);
        } catch (error) {
          console.error("Error fetching Parcels:", error);
          setIsParcelLoading(false);
        }
      };
      fetchParcels();
    }
  }, [userData?._id]);

  console.log(parcels);
  return (
    <div>
      <h2>my delivery</h2>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Delivery List</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Receiver's Name</th>
                <th className="border px-4 py-2">Receiver's Phone</th>
                <th className="border px-4 py-2">Receiver's Address</th>
                <th className="border px-4 py-2">Booked User’s Name</th>
                <th className="border px-4 py-2">Booked User’s Phone</th>
                <th className="border px-4 py-2">Requested Delivery Date</th>
                <th className="border px-4 py-2">Approx. Delivery Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="text-center text-black border px-4 py-2">
                    {parcel?.receiverName}
                  </td>
                  <td className="text-center text-black border px-4 py-2">
                    {parcel?.receiverPhone}
                  </td>
                  <td className="text-center text-black border px-4 py-2">
                    {parcel?.deliveryAddress}
                  </td>
                  <td className="text-center text-black border px-4 py-2">
                    {parcel?.name}
                  </td>
                  <td className="text-center text-black border px-4 py-2">
                    {parcel?.phoneNumber}
                  </td>
                  <td className="text-center text-black border px-4 py-2">
                    {parcel?.deliveryDate}
                  </td>
                  <td className="text-center text-black border px-4 py-2">
                    {parcel?.approxDeliveryDate}
                  </td>
                  <td className="text-center text-black border px-4 py-2 space-y-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded w-full">
                      View Location
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded w-full">
                      Cancel
                    </button>
                    <button className="bg-green-500 text-white px-2 py-1 rounded w-full">
                      Deliver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDelivery;
