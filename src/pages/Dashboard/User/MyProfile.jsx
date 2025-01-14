import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { imageUpload, updateUser } from "../../../api/utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile, setUser, loading } = useAuth();
  const [updatedUser, setUpdatedUser] = useState(user);
  console.log(user);
  const {
    data: myProfile = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(myProfile);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const image = form.image.files[0];
    const photoURL = await imageUpload(image);
    console.log({ name, email, phone, image, photoURL });

    try {
      await updateUserProfile(name, photoURL);

      const response = await axiosSecure.put(`/updateUser/${user?.email}`, {
        name,
        image: photoURL,
        phone,
      });

      // Handle the response if needed
      console.log(response.data);
      if (response.data.modifiedCount > 0) {
        console.log("User profile updated successfully");
        toast.success("profile update successfully");
        setUpdatedUser({ ...updatedUser, displayName: name, photoURL });
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">My Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={
            updatedUser?.photoURL ||
            user?.photoURL ||
            "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        {/* <label className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
          {uploading ? "Uploading..." : "Upload New Picture"}
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
        </label> */}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={updatedUser?.displayName || user?.displayName}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={updatedUser?.email || user?.email}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            defaultValue={updatedUser?.phone || user?.phone || myProfile?.phone}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-primary"
          >
            update Image:
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-accent rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
