import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Main/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminHome from "./Main/AdminHome";
import BookingManager from "./Components/Admin/BookingManager";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import UserHome from "./Main/UserHome";
import UserDashboard from "./Components/User/UserDashboard";
import BookSlot from "./Components/User/Bookslot";
import ActiveBooking from "./Components/User/ActiveBooking";
import UpcomingBookings from "./Components/User/UpcomingBookings";
import BookingHistory from "./Components/Admin/BookingHistory";
import BillingHistory from "./Components/Admin/BillHistory";
import UserManager from "./Components/Admin/UserMange";
import UserBookingHistory from "./Components/User/UserBookingHistory";
import SearchParking from "./Components/SearchParking";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/searchparking",
      element: <SearchParking />,
    },
    {
      path: "/adminhome",
      element: <AdminHome />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "admindasboard", element: <AdminDashboard /> },
        { path: "bookingmanager", element: <BookingManager /> },
        { path: "bookinghistory", element: <BookingHistory /> },
        { path: "billinghistory", element: <BillingHistory /> },
        { path: "usermanage", element: <UserManager /> },
      ],
    },
    {
      path: "/userhome",
      element: <UserHome />,
      children: [
        { index: true, element: <UserDashboard /> },
        { path: "userdashboard", element: <UserDashboard /> },
        { path: "bookslot", element: <BookSlot /> },
        { path: "activebooking", element: <ActiveBooking /> },
        { path: "upcomingbookings", element: <UpcomingBookings /> },
        { path: "userbookinghistory", element: <UserBookingHistory /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
