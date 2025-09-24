import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [CarEntries, setCarEntries] = useState(0);
  const [BikeEntries, setBikeEntries] = useState(0);
  const [ActiveBookings, setActiveBookings] = useState(0);
  const [TodayIncome, setTodayIncome] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) {
      // alert("Please login to book a slot");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5266/api/Booking/CountTodayEntriesCar")
      .then((response) => {
        setCarEntries(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(`http://localhost:5266/api/Booking/CountTodayEntriesBike`)
      .then((response) => {
        setBikeEntries(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(`http://localhost:5266/api/Booking/AllActiveBooking`)
      .then((response) => {
        setActiveBookings(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(`http://localhost:5266/api/Booking/TodayIncome`)
      .then((response) => {
        setTodayIncome(response.data.value);
        // console.log(response.data.value);
      })
      .catch((error) => console.error(error));
  });
  return (
    <>
      <div className="content-area" id="contentArea">
        <h2 className="mb-4">Admin Dashboard</h2>

        <div className="stats-grid d-flex flex-wrap gap-3 mb-4">
          <div className="card dashboard-card flex-fill text-center p-3">
            <div className="card-body">
              <i className="bi-car-front-fill card-icon"></i>
              <h5 className="card-title">Today Revenue</h5>
              <h3 className="card-text">{TodayIncome}</h3>
            </div>
          </div>

          <div className="card dashboard-card flex-fill text-center p-3">
            <div className="card-body">
              <i className="bi bi-check-circle card-icon fs-1 mb-2"></i>
              <h5 className="card-title">Today Bikes Entries</h5>
              <h3 className="card-text">{BikeEntries}</h3>
            </div>
          </div>

          <div className="card dashboard-card flex-fill text-center p-3">
            <div className="card-body">
              <i className="bi bi-currency-dollar card-icon fs-1 mb-2"></i>
              <h5 className="card-title"> Today Cars Entries</h5>
              <h3 className="card-text">{CarEntries}</h3>
            </div>
          </div>

          <div className="card dashboard-card flex-fill text-center p-3">
            <div className="card-body">
              <i className="bi bi-people card-icon fs-1 mb-2"></i>
              <h5 className="card-title">Active Bookings</h5>
              <h3 className="card-text">{ActiveBookings}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
