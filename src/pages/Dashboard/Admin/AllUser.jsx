import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-user`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleRoleUpdate = async (userId, role) => {
    console.log(userId, role);
    try {
      await axiosSecure.patch(`/update-user-role/${userId}`, { role });
      refetch();
      toast.success(`User role updated to ${role}`);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Parcels Booked</th>
            <th className="border px-4 py-2">Total Spent ($)</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td className="border text-text px-4 py-2">{user.name}</td>
              <td className="border text-text px-4 py-2">
                {user.phone || "N/A"}
              </td>
              <td className="border text-text px-4 py-2">{user.role}</td>
              <td className="border text-text px-4 py-2">
                {user.totalSpent || 0}
              </td>
              <td className="border text-text px-4 py-2">
                <button
                  className="bg-primary text-black px-2 py-1 mr-2 rounded"
                  onClick={() => handleRoleUpdate(user._id, "deliveryman")}
                >
                  Make Delivery Men
                </button>
                <button
                  className="bg-secondary text-text px-2 py-1 rounded"
                  onClick={() => handleRoleUpdate(user._id, "admin")}
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className=" flex  mx-auto  justify-center fixed bottom-4 items-center mt-4">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-primary text-black"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllUser;
