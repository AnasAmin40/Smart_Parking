import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveBooking = () => {
  const [ActiveBookings, setActiveBooking] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(
        `http://localhost:5266/api/Booking/GetUserActiveBookings/${user.userID}`
      )
      .then((response) => {
        setActiveBooking(response.data.value);
        console.log(response.data.value);
      })
      .catch((error) => console.log(error));
  }, []);

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <>
      <div className="content-area" id="contentArea">
        <h3 className="mb-4">Current Booking Status</h3>
        <div id="activeBookingsContainer" className="row g-3">
          {ActiveBookings.length > 0 ? (
            ActiveBookings.map((curElm) => (
              <div key={curElm.bookingId} className="col-md-4">
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-success">
                      Booking ID: {curElm.bookingId}
                    </h5>
                    <p className="mb-1">
                      <strong>Location: </strong>
                      {curElm.locationName}
                    </p>
                    <p className="mb-1">
                      <strong>Slot Number: </strong> {curElm.slotNumber}
                    </p>
                    <p className="mb-1">
                      <strong>Slot Type: </strong>
                      {curElm.slotType}
                    </p>
                    <p className="mb-1">
                      <strong>Start Time: </strong>
                      {formatDateTime(curElm.startTime)}
                    </p>
                    <p className="mb-0">
                      <strong>End Time: </strong>{" "}
                      {formatDateTime(curElm.exitTime)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted p-5">
              <h5>❌ No Active Booking found.</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveBooking;
