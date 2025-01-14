import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewLoading, setIsReviewLoading] = useState(true);

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

  // Fetch reviews once we have the user _id
  useEffect(() => {
    if (userData?._id) {
      const fetchReviews = async () => {
        try {
          const res = await axiosSecure.get(`/myReview/${userData._id}`);
          setReviews(res.data);
          setIsReviewLoading(false);
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setIsReviewLoading(false);
        }
      };
      fetchReviews();
    }
  }, [userData?._id]);

  if (isLoading || isReviewLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-primary">My Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-secondary shadow-lg rounded-lg p-4"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.userImage || "/default-avatar.png"}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-text">{review.userName}</h3>
                  <p className="text-sm text-text">
                    {new Date(review.reviewDate).toLocaleString()}
                  </p>{" "}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < review.rating ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 17.75l-4.666 3.089 1.767-5.556L3.25 9.914l5.762-.209L12 3.25l2.188 6.455 5.762.209-3.85 5.369 1.767 5.556L12 17.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-text">{review.feedbackText}</p>
            </div>
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>
    </div>
  );
};

export default MyReview;
