import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  // const [calculatedPrice, setCalculatedPrice] = useState("");

  // Early return if ID is missing to maintain consistent hook usage
  if (!id) {
    return <p>No parcel to update</p>;
  }

  // Fetch parcel data using TanStack Query
  const {
    data: parcel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/update/${id}`);
      return res.data;
    },
  });

  // Handle loading and error states
  const [calculatedPrice, setCalculatedPrice] = useState(parcel?.price);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error fetching parcel data: {error.message}</p>;
  const {
    name,
    email,
    phoneNumber,
    receiverName,
    receiverPhone,
    deliveryAddress,
    deliveryDate,
    parcelType,
    parcelWeight,
    price,
    latitude,
    longitude,
  } = parcel || {};

  const handleWeightChange = (weight) => {
    const weightValue = parseFloat(weight);
    let price = 0;

    if (weightValue <= 1) {
      price = 50;
    } else if (weightValue === 2) {
      price = 100;
    } else {
      price = 150;
    }

    setCalculatedPrice(price);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedParcel = {
      name: user?.displayName, // Use current user's name
      email: user?.email, // Use current user's email
      parcelType: form.parcelType.value,
      parcelWeight: form.parcelWeight.value,
      receiverName: form.receiverName.value,
      phoneNumber: form.phoneNumber.value,
      receiverPhone: form.receiverPhone.value,
      deliveryAddress: form.deliveryAddress.value,
      deliveryDate: form.deliveryDate.value,
      latitude: form.latitude.value,
      longitude: form.longitude.value,
      // price: form.price.value,
      price: calculatedPrice,
      // If price needs to be calculated dynamically, add logic here
      //   price: form.parcelWeight.value * 10,
    };

    console.log(updatedParcel);

    try {
      // Send PUT request to update the parcel
      const res = await axiosSecure.put(`/updateParcel/${id}`, updatedParcel);
      console.log(res.data);
      if (res.data?.result?.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Data updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        // navigate("/myQuery");
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.message || "Failed to update data",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="p-6 bg-secondary rounded-md shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Update Parcel
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="flex gap-5">
          <div className="flex-grow">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName || ""}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              defaultValue={user?.email || ""}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex-grow">
            <label className="block text-sm font-medium">Parcel Type</label>
            <input
              name="parcelType"
              type="text"
              defaultValue={parcelType}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter parcel type"
              required
            />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Parcel Weight (kg)
            </label>
            <input
              name="parcelWeight"
              type="number"
              defaultValue={parcelWeight}
              onChange={(e) => handleWeightChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter parcel weight"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Receiver's Name</label>
          <input
            name="receiverName"
            type="text"
            defaultValue={receiverName}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter receiver's name"
            required
          />
        </div>

        <div className="flex gap-5">
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Your Phone Number
            </label>
            <input
              name="phoneNumber"
              type="text"
              defaultValue={phoneNumber}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Receiver's Phone Number
            </label>
            <input
              name="receiverPhone"
              type="text"
              defaultValue={receiverPhone}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter receiver's phone number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Parcel Delivery Address
          </label>
          <textarea
            name="deliveryAddress"
            defaultValue={deliveryAddress}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter delivery address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Requested Delivery Date
          </label>
          <input
            name="deliveryDate"
            type="date"
            defaultValue={deliveryDate}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="flex gap-5">
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Delivery Address Latitude
            </label>
            <input
              name="latitude"
              type="text"
              defaultValue={latitude}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter latitude"
              required
            />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Delivery Address Longitude
            </label>
            <input
              name="longitude"
              type="text"
              defaultValue={longitude}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter longitude"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            name="price"
            defaultValue={price}
            value={calculatedPrice}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update Parcel
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;
