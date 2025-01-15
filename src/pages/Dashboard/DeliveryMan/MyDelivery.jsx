import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import MapComponent from "../../../components/MapComponent/MapComponent";
// import MapComponent from "../../../components/MapComponent/MapComponent";

const MyDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isParcelLoading, setIsParcelLoading] = useState(true);

  const [selectedParcel, setSelectedParcel] = useState(null);

  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  // const handleButtonClick = () => {
  //   setShowMap(true); // Set to true when the button is clicked
  // };

  const handleViewLocation = (latitude, longitude) => {
    console.log(latitude, longitude);
    setSelectedLocation({ latitude, longitude });
  };

  console.log(parcels);
  console.log(selectedLocation);

  // Handle action confirmation
  const handleActionConfirm = async (parcelId, newStatus) => {
    const action = newStatus === "delivered" ? "delivered" : "cancel";
    const result = await Swal.fire({
      title: `Are you sure?`,
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
        console.error(`Error updating parcel status:`, error);
        Swal.fire(
          "Error!",
          "An error occurred while updating the parcel.",
          "error"
        );
      }
    }
  };
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
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded w-full"
                      // onClick={handleButtonClick}
                      onClick={() =>
                        handleViewLocation(parcel.latitude, parcel.longitude)
                      }
                    >
                      View Location
                      {/* {showMap && (
                        <div className="mt-4">
                          <MapComponent
                          latitude={parcel.latitude}
                          longitude={parcel.longitude}
                          />
                        </div>
                      )} */}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedLocation && (
        <div className="mt-4">
          <MapComponent
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
          />
        </div>
      )}
    </div>
  );
};

export default MyDelivery;
