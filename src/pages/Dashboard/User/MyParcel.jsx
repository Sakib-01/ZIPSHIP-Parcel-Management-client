import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyParcel = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [deliveryMan, setDeliveryMan] = useState("");
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myParcel", user?.email, selectedStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-parcel/${user?.email}?status=${selectedStatus}`
      );
      return res.data;
    },
  });

  const handleCancle = async (parcelId) => {
    const confirmCancel = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirmCancel.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/delete/${parcelId}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Cancelled!", "Your parcel has been cancelled.", "success");
          refetch(); // Refresh parcel list
        } else {
          Swal.fire("Failed!", "Failed to cancel the parcel.", "error");
        }
      } catch (error) {
        console.error("Error canceling parcel:", error);
        Swal.fire(
          "Error!",
          "An error occurred while canceling the parcel.",
          "error"
        );
      }
    }
  };

  const handleSubmitReview = async () => {
    const reviewData = {
      userName: user?.displayName,
      userImage: user?.photoURL,
      rating,
      feedbackText,
      deliveryManId: deliveryMan,
    };
    console.log(deliveryMan);

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your review has been submitted.", "success");
        setIsModalOpen(false);
        setRating(0);
        setFeedbackText("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire(
        "Error!",
        "An error occurred while submitting the review.",
        "error"
      );
    }
  };

  if (isLoading) return <LoadingSpinner />;
  console.log(parcels);
  console.log(selectedStatus);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">My Parcels</h2>
        <div className="flex justify-center items-center gap-5">
          <label htmlFor="status" className="block text-2xl ">
            Status
          </label>
          <select
            id="status"
            className="border border-gray-300 p-2 w-full"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="On The Way">On The Way</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

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
              <th className="border px-4 py-2">Payment</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="border px-4 py-2">{parcel.parcelType}</td>
                <td className="border px-4 py-2">{parcel.deliveryDate}</td>
                <td className="border px-4 py-2">
                  {parcel.approxDeliveryDate || "soon"}
                </td>
                <td className="border px-4 py-2">
                  {new Date(parcel.bookingDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {parcel.deliveryMan || "Not Assigned"}
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
                    onClick={() => handleCancle(parcel._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:bg-gray-300"
                    disabled={parcel.status !== "pending"}
                  >
                    Cancel
                  </button>
                  {parcel.status === "delivered" && (
                    <button
                      onClick={() => {
                        setDeliveryMan(parcel.deliveryMan);
                        setSelectedParcel(parcel);
                        setIsModalOpen(true);
                      }}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Review
                    </button>
                  )}
                </td>
                {parcel?.payment === "done" ? (
                  <div className="flex justify-center items-center text-lg text-green-500 px-5">
                    paid
                  </div>
                ) : (
                  <td className="border px-4 py-2 space-x-2">
                    <Link
                      to="/dashboard/payment"
                      state={{ parcel }}
                      // to={{ pathname: "/dashboard/payment", state: { parcel } }}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      PAY
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Review */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-secondary p-6 rounded-lg w-96 text-text">
              <h3 className="text-xl mb-4">Give a Review</h3>

              <div className="flex justify-between items-center">
                {/* Auto-filled User Image */}
                <div className="mb-4">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                {/* Auto-filled User Name */}
                <div className="mb-4">
                  <label htmlFor="userName" className="block mb-2">
                    User's Name
                  </label>
                  <input
                    id="userName"
                    type="text"
                    className="border border-gray-300 p-2 w-full text-black" // Add the text-red-500 class here
                    value={user?.displayName}
                    readOnly
                  />
                </div>
              </div>

              {/* Rating Input */}
              <div className="mb-4">
                <label htmlFor="rating" className="block mb-2">
                  Rating (out of 5)
                </label>
                <input
                  id="rating"
                  type="number"
                  className="border border-gray-300 p-2 w-full text-black"
                  value={rating}
                  min="1"
                  max="5"
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>

              {/* Feedback Text Input */}
              <div className="mb-4">
                <label htmlFor="feedbackText" className="block mb-2">
                  Feedback
                </label>
                <textarea
                  id="feedbackText"
                  className="border border-gray-300 p-2 w-full text-black"
                  rows="4"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
              </div>

              {/* Auto-filled Delivery Man ID */}
              <div className="mb-4">
                <label htmlFor="deliveryManId" className="block mb-2">
                  Delivery Man's ID
                </label>
                <input
                  id="deliveryManId"
                  type="text"
                  className="border border-gray-300 p-2 w-full"
                  value={deliveryMan || "Not Assigned"}
                  readOnly
                  onChange={(e) => setDeliveryMan(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-primary text-white px-4 py-2 rounded mr-2"
                  onClick={handleSubmitReview}
                >
                  Submit Review
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
    </div>
  );
};

export default MyParcel;
