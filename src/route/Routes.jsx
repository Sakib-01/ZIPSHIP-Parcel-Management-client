import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import BookParcel from "../pages/Dashboard/User/BookParcel";
import MyDelivery from "../pages/Dashboard/DeliveryMan/MyDelivery";
import Statistics from "../pages/Dashboard/Admin/Statistics";
import Common from "../pages/Dashboard/Common/Common";
import MyParcel from "../pages/Dashboard/User/MyParcel";
import UpdateParcel from "../pages/Dashboard/User/UpdateParcel";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import AllParcel from "../pages/Dashboard/Admin/AllParcel";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen";
import AllUser from "../pages/Dashboard/Admin/AllUser";
import MyReview from "../pages/Dashboard/DeliveryMan/MyReview";
import Payment from "../pages/Dashboard/User/Payment/Payment";
import MapComponent from "../components/MapComponent/MapComponent";
import PrivateRoute from "./PrivateRoute";
import DeliveryManRoute from "./DeliveryManRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Common></Common>,
      },
      // user route
      {
        path: "book-parcel",
        element: (
          <PrivateRoute>
            <BookParcel></BookParcel>
          </PrivateRoute>
        ),
      },
      {
        path: "my-parcel",
        element: (
          <PrivateRoute>
            <MyParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-parcel/:id",
        element: (
          <PrivateRoute>
            <UpdateParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      // deliveryman route
      {
        path: "mydelivery",
        element: (
          <PrivateRoute>
            <DeliveryManRoute>
              <MyDelivery></MyDelivery>
            </DeliveryManRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-review",
        element: (
          <PrivateRoute>
            <DeliveryManRoute>
              <MyReview />
            </DeliveryManRoute>
          </PrivateRoute>
        ),
      },

      // admin route
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
      },
      {
        path: "all-parcels",
        element: (
          <AdminRoute>
            <AllParcel />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "all-deliverymen",
        element: (
          <AdminRoute>
            <AllDeliveryMen />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
