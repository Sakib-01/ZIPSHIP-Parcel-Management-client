import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import toast from "react-hot-toast";

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [currentParcelId, setCurrentParcelId] = useState(null);
  const [filters, setFilters] = useState({ from: "", to: "" });

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", filters],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-parcel?from=${filters.from}&to=${filters.to}`
      );
      return res.data;
    },
  });

  const { data: deliveryMen = [] } = useQuery({
    queryKey: ["deliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get("/deliveryman");
      return res.data;
    },
  });

  const handleManageClick = (parcelId) => {
    setCurrentParcelId(parcelId);
    const parcel = parcels.find((p) => p._id === parcelId);
    if (parcel) {
      setSelectedDeliveryMan(parcel.deliveryMan || "");
      setDeliveryDate(parcel.approxDeliveryDate || "");
      setSelectedStatus(parcel.status || "pending");
    }
    setIsModalOpen(true);
  };

  const handleAssign = async () => {
    console.log(currentParcelId);
    try {
      // Make an API call to update the parcel with the assigned deliveryman and delivery date
      const res = await axiosSecure.patch(`/update-parcel/${currentParcelId}`, {
        deliveryManId: selectedDeliveryMan,
        approximateDeliveryDate: deliveryDate,
        status: selectedStatus,
      });
      console.log(res.data);
      if (res.status === 200) {
        // Close the modal and reset form values
        setIsModalOpen(false);
        setSelectedDeliveryMan("");
        setDeliveryDate("");
        toast.success("successful");
        refetch();
        // setSelectedStatus("");
      }
    } catch (error) {
      console.error("Error assigning delivery man:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  console.log(deliveryMen);
  console.log(parcels);

  return (
    <div>
      <h2 className="text-primary my-5 underline text-3xl flex mx-auto justify-center items-center">
        All Parcels
      </h2>
      {/* Search Filters */}
      <div className="flex  gap-2">
        <div>
          <label htmlFor="deliveryDate" className="block mb-2">
            Search from Date
          </label>
          <input
            type="date"
            value={filters.from}
            className="border-2 mb-10"
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="deliveryDate" className="block mb-2">
            to Date
          </label>
          <input
            type="date"
            value={filters.to}
            className="border-2 mb-10"
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          />
        </div>
        {/* <button onClick={fetchParcels}>Search</button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 bg-background text-text">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">User's Name</th>
              <th className="border border-gray-300 px-4 py-2">User's Phone</th>
              <th className="border border-gray-300 px-4 py-2">Booking Date</th>
              <th className="border border-gray-300 px-4 py-2">
                Requested Delivery Date
              </th>
              <th className="border border-gray-300 px-4 py-2">DMan Id</th>
              <th className="border border-gray-300 px-4 py-2">
                Approx D-Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Cost</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Manage</th>
            </tr>
          </thead>
          <tbody className="text-text bg-background">
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.phoneNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.bookingDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.deliveryDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.deliveryMan || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.approxDeliveryDate || "not assigned"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${parcel.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={() => handleManageClick(parcel._id)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-secondary p-6 rounded-lg w-96 text-text">
            <h3 className="text-xl mb-4">Assign Delivery Man</h3>
            <div className="mb-4">
              <label htmlFor="deliveryMan" className="block mb-2">
                Delivery Man
              </label>
              <select
                id="deliveryMan"
                className="border border-gray-300 p-2 w-full"
                value={selectedDeliveryMan}
                onChange={(e) => setSelectedDeliveryMan(e.target.value)}
              >
                <option value="">Select Delivery Man</option>
                {deliveryMen.map((deliveryMan) => (
                  <option key={deliveryMan._id} value={deliveryMan._id}>
                    {deliveryMan.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="deliveryDate" className="block mb-2">
                Approximate Delivery Date
              </label>
              <input
                id="deliveryDate"
                type="date"
                className="border border-gray-300 p-2 w-full"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deliveryMan" className="block mb-2">
                Status
              </label>
              <select
                id="Status"
                className="border border-gray-300 p-2 w-full"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="On The Way">On The Way</option>
                <option value="delivered">Delivered</option>
                <option value="returned">Returned</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-primary text-white px-4 py-2 rounded mr-2"
                onClick={handleAssign}
              >
                Assign
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcel;
