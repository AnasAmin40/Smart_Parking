import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookSlot = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [Location, SetLocation] = useState([]);
  const [Slot, SetSlot] = useState([]);
  const now = new Date();
  const formatted = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  const oneHourLater = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  const secondTime = new Date(
    oneHourLater.getTime() - oneHourLater.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [Booking, setBooking] = useState({
    locationId: 0,
    slotId: 0,
    slotType: "",
    startTime: formatted,
    endTime: secondTime,
    durationHours: 1,
  });

  const [selection, setSelection] = useState(() => {
    const saved = localStorage.getItem("SelectData");
    return saved ? JSON.parse(saved) : [];
  });
  // console.log("selection..", selection);

  const steps = [
    "Time & Duration",
    "Location",
    "Slot Type",
    "Select Slot",
    "Confirm",
  ];

  useEffect(() => {
    if (selection && selection.StartTime) {
      setBooking((prev) => ({
        ...prev,
        startTime: selection.StartTime,
        endTime: selection.EndTime,
        locationId: selection.Location,
        slotId: selection.SlotId,
        slotType: selection.SlotType,
      }));
      localStorage.removeItem("SelectData");
    }
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          "http://localhost:5266/api/Booking/GetAllLocation"
        );
        const data = await response.json();
        SetLocation(data.value);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocation();
  }, []);

  // Handle changes
  const changeHandle = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => {
      let newBooking = {
        ...prev,
        [name]:
          name === "locationId" || name === "durationHours"
            ? Number(value)
            : value,
      };
      if (name === "durationHours") {
        const duration = Number(value);
        const start = new Date(newBooking.startTime);
        const end = new Date(start.getTime() + duration * 60 * 60 * 1000);
        newBooking.endTime = end.toISOString().slice(0, 16);
        console.log(newBooking.endTime);
      }
      return newBooking;
    });
  };

  // Fetch available slots
  const AvailableSlot = async () => {
    if (
      Booking.endTime &&
      Booking.startTime &&
      Booking.locationId &&
      Booking.slotType
    ) {
      try {
        const response = await fetch(
          `http://localhost:5266/api/Booking/IsAvailableSlot?LocationId=${Booking.locationId}&StartTime=${Booking.startTime}&EndTime=${Booking.endTime}&Slottype=${Booking.slotType}`
        );
        const data = await response.json();
        const available = data.filter((slot) => slot.isAvailable === true);
        SetSlot(available);
        console.log(available);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (
      Booking.endTime &&
      Booking.startTime &&
      Booking.locationId &&
      Booking.slotType
    ) {
      AvailableSlot();
    }
  }, [
    Booking.endTime,
    Booking.startTime,
    Booking.locationId,
    Booking.slotType,
  ]);

  const isFormValid = () => {
    return (
      Booking.startTime &&
      Booking.durationHours > 0 &&
      Booking.locationId !== 0 &&
      Booking.slotType !== "" &&
      Booking.slotId !== 0 &&
      Booking.slotId !== ""
    );
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login to book a slot");
    navigate("/login");
    return;
  }

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("⚠️ Please fill all required fields before submitting.");
      return;
    }

    const data = {
      userId: user.userID,
      locationId: Booking.locationId,
      slotId: Booking.slotId,
      slotType: Booking.slotType,
      startTime: Booking.startTime,
      durationHours: Booking.durationHours,
    };
    console.log(data);

    try {
      const response = await fetch(
        "http://localhost:5266/api/Booking/CreateBooking",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response) {
        throw new Error("Network Response was not work");
      }

      const result = await response.json();
      if (result.sueccess === true) {
        navigate("/userhome/upcomingbookings");
      }
      console.log(result);
    } catch (error) {}
  };

  return (
    <>
      <div className="content-area" id="contentArea">
        <div className="step-indicator d-flex justify-content-between mb-4">
          {steps.map((stepTitle, index) => (
            <div
              key={index}
              className={`step ${index === currentStep ? "active" : ""}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-title">{stepTitle}</div>
            </div>
          ))}
        </div>

        <div className="booking-card">
          <h3>
            <i className="bi bi-calendar-plus me-2"></i>Book Parking Slot
          </h3>

          <form className="row g-4" onSubmit={handleBooking}>
            {currentStep === 0 && (
              <>
                <div className="col-md-6">
                  <label className="form-label">Start Time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    className="form-control"
                    value={Booking.startTime}
                    onChange={changeHandle}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Duration (hours)</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="12"
                    name="durationHours"
                    value={Booking.durationHours}
                    onChange={changeHandle}
                  />
                  <div className="form-text">Maximum 12 hours per booking</div>
                </div>
              </>
            )}

            {currentStep === 1 && (
              <div className="col-md-6">
                <label className="form-label">Select Location</label>
                <select
                  className="form-select"
                  name="locationId"
                  value={Booking.locationId}
                  onChange={changeHandle}
                >
                  <option value="">Select Location</option>
                  {Location.map((curElem) => (
                    <option key={curElem.locationId} value={curElem.locationId}>
                      {curElem.locationName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentStep === 2 && (
              <div className="col-md-6">
                <label className="form-label">Slot Type</label>
                <select
                  className="form-select"
                  value={Booking.slotType}
                  onChange={(e) =>
                    setBooking({ ...Booking, slotType: e.target.value })
                  }
                >
                  <option value="">Slot Type</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Bus">Bus</option>
                  <option value="VIP_Car">VIP Car</option>
                </select>
              </div>
            )}

            {currentStep === 3 && (
              <div className="col-md-6">
                <label className="form-label">Select Slot</label>
                <select
                  className="form-select"
                  value={Booking.slotId}
                  onChange={(e) =>
                    setBooking({ ...Booking, slotId: e.target.value })
                  }
                >
                  <option value="">Select Slot</option>
                  {Slot.map((curElem) => (
                    <option key={curElem.slotId} value={curElem.slotId}>
                      {curElem.slotNumber}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentStep === 4 && (
              <div className="col-md-12">
                <div className="p-3 bg-light rounded">
                  <h6>Confirm Booking</h6>
                  <p>
                    <strong>Location:</strong> {Booking.locationId}
                  </p>
                  <p>
                    <strong>Slot:</strong> {Booking.slotId}
                  </p>
                  <p>
                    <strong>Type:</strong> {Booking.slotType}
                  </p>
                  <p>
                    <strong>Start:</strong> {Booking.startTime}
                  </p>
                  <p>
                    <strong>End:</strong> {Booking.endTime}
                  </p>
                </div>
                <button type="submit" className="btn btn-success mt-3">
                  <i className="bi bi-check-circle me-2"></i>Book Slot
                </button>
              </div>
            )}

            <div className="col-12 mt-4 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={currentStep === steps.length - 1}
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookSlot;
