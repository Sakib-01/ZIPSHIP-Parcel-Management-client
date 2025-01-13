import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm();

  const [price, setPrice] = useState(0);

  // Watch parcel weight to auto-calculate price
  const parcelWeight = watch("parcelWeight");

  const calculatePrice = (weight) => {
    if (weight <= 1) return 50;
    if (weight === 2) return 100;
    return 150;
  };

  const onSubmit = async (data) => {
    const parcelData = {
      ...data,
      price,
      name: user?.displayName,
      email: user?.email,
    };
    // save parcel in db
    try {
      await axiosSecure.post("/parcel", parcelData);
      toast.success("Parcel booked successfully!");
    } catch (err) {
      console.log(err);
    }
    console.log(parcelData);
    // toast.success("Parcel booked successfully!");
    // reset(); // Reset form after submission
  };

  // Update price when parcel weight changes
  useEffect(() => {
    if (parcelWeight) setPrice(calculatePrice(Number(parcelWeight)));
  }, [parcelWeight]);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Book a Parcel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-5 ">
          <div className="flex-grow">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex-grow">
            <label className="block text-sm font-medium">Parcel Type</label>
            <input
              type="text"
              {...register("parcelType", { required: true })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter parcel type"
            />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Parcel Weight (kg)
            </label>
            <input
              type="number"
              {...register("parcelWeight", { required: true, min: 1 })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter parcel weight"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Receiver's Name</label>
          <input
            type="text"
            {...register("receiverName", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter receiver's name"
          />
        </div>
        <div className="flex gap-5">
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              {" "}
              Your Phone Number
            </label>
            <input
              type="text"
              {...register("phoneNumber", { required: true })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Receiver's Phone Number
            </label>
            <input
              type="text"
              {...register("receiverPhone", { required: true })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter receiver's phone number"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Parcel Delivery Address
          </label>
          <textarea
            {...register("deliveryAddress", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter delivery address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Requested Delivery Date
          </label>
          <input
            type="date"
            {...register("deliveryDate", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex gap-5">
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Delivery Address Latitude
            </label>
            <input
              type="text"
              {...register("latitude", { required: true })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter latitude"
            />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium">
              Delivery Address Longitude
            </label>
            <input
              type="text"
              {...register("longitude", { required: true })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter longitude"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            value={`${price} Tk`}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Book Parcel
        </button>
      </form>
    </div>
  );
};

export default BookParcel;
