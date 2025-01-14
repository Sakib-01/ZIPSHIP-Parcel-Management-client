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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Common></Common>,
      },
      // user route
      {
        path: "book-parcel",
        element: <BookParcel></BookParcel>,
      },
      {
        path: "my-parcel",
        element: <MyParcel />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/update-parcel/:id",
        element: <UpdateParcel />,
      },
      // deliveryman route
      {
        path: "/dashboard/mydelivery",
        element: <MyDelivery></MyDelivery>,
      },
      // admin route
      {
        path: "statistics",
        element: <Statistics></Statistics>,
      },
      {
        path: "all-parcels",
        element: <AllParcel />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
