import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import MapComponent from "../../../components/MapComponent/MapComponent";
import { MdFileDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../../components/LoadingSpinner";

const MyDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isParcelLoading, setIsParcelLoading] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          setParcels(res.data.reverse());
          setIsParcelLoading(false);
        } catch (error) {
          console.error("Error fetching Parcels:", error);
          setIsParcelLoading(false);
        }
      };
      fetchParcels();
    }
  }, [userData?._id]);

  // Handle View Location
  const handleViewLocation = (latitude, longitude) => {
    setSelectedParcel({ latitude, longitude });
    setIsModalOpen(true); // Open modal
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  // Handle Action Confirm
  const handleActionConfirm = async (parcelId, newStatus) => {
    const action = newStatus === "delivered" ? "delivered" : "cancel";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${action} this parcel?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/update-delivery/${parcelId}`, {
          status: newStatus,
        });
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", `Parcel has been ${action}ed.`, "success");
          setParcels((prevParcels) =>
            prevParcels.map((parcel) =>
              parcel._id === parcelId
                ? { ...parcel, status: newStatus }
                : parcel
            )
          );
        } else {
          Swal.fire("Error!", "Could not update the parcel status.", "error");
        }
      } catch (error) {
        console.error("Error updating parcel status:", error);
        Swal.fire(
          "Error!",
          "An error occurred while updating the parcel.",
          "error"
        );
      }
    }
  };

  console.log(parcels.length);
  if (isParcelLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h2 className="text-2xl font-bold">My Delivery List</h2>
      {parcels?.length > 0 ? (
        <div className="p-4">
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
                  <th className="border px-4 py-2">Parcel status</th>
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
                    <td className="text-center text-black border px-4 py-2">
                      {parcel?.status}
                    </td>
                    {parcel?.status === "delivered" ? (
                      <div className="flex justify-center items-center text-3xl text-green-600 ">
                        <MdFileDownloadDone />
                      </div>
                    ) : (
                      <td className="border px-4 py-2 space-y-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded w-full"
                          onClick={() =>
                            handleViewLocation(
                              parcel.latitude,
                              parcel.longitude
                            )
                          }
                        >
                          View Location
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded w-full"
                          onClick={() =>
                            handleActionConfirm(parcel._id, "Returned")
                          }
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded w-full"
                          onClick={() =>
                            handleActionConfirm(parcel._id, "delivered")
                          }
                        >
                          Deliver
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h2 className="text-3xl text-primary">No Parcel.........</h2>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <h3 className="text-lg font-bold mb-4">Parcel Location</h3>
            <MapComponent
              latitude={selectedParcel.latitude}
              longitude={selectedParcel.longitude}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDelivery;
