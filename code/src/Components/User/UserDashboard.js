import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [Location, setLocation] = useState(0);
  const [ActiveBookings, SetActiveBookings] = useState(0);
  const [UpcomingBookings, setUpcomingBookings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const slot = JSON.parse(localStorage.getItem("slotdata"));

    console.log(slot);
    if (!user) {
      // alert("Please login to book a slot");
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5266/api/Location/CountLocation")
      .then((response) => {
        setLocation(response.data.value);
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `http://localhost:5266/api/Booking/ActiveBookingCounter/${user.userID}`
      )
      .then((response) => {
        SetActiveBookings(response.data.value);
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `http://localhost:5266/api/Booking/UpcomingBookingCounter/${user.userID}`
      )
      .then((response) => {
        setUpcomingBookings(response.data.value);
      })
      .catch((error) => console.error(error));
  });

  return (
    <>
      <div className="content-area" id="contentArea">
        <h2 className="mb-4">User Dashboard</h2>

        <div className="stats-grid d-flex flex-wrap gap-3 mb-4">
          <div className="card dashboard-card flex-fill text-center p-3">
            <div className="card-body">
              <i className="bi-car-front-fill card-icon"></i>
              <h3 className="card-text">{Location}</h3>
              <h5 className="card-title">Parking Locations</h5>
            </div>
          </div>

          <div className="card dashboard-card flex-fill text-center p-3">
            <div className="card-body">
              <i className="bi bi-check-circle card-icon"></i>
              <h3 className="card-text">{ActiveBookings}</h3>
              <h5 className="card-title">Active Bookings</h5>
            </div>
          </div>
          <div className="card dashboard-card flex-fill text-center p-3">
            <div className="card-body">
              <i className="bi bi-currency-dollar card-icon fs-1 mb-2"></i>
              <h3 className="card-text">{UpcomingBookings}</h3>
              <h5 className="card-title">Upcoming Bookings</h5>
            </div>
          </div>

          <div className="card dashboard-card flex-fill text-center p-3">
            <div className="card-body">
              <i className="bi bi-people card-icon fs-1 mb-2"></i>
              <h3 className="card-text">{UpcomingBookings + ActiveBookings}</h3>
              <h5 className="text-muted">Total Bookings</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
