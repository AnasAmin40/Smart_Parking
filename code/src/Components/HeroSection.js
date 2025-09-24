import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [Location, SetLocation] = useState([]);
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
    localStorage.removeItem("slotdata");
    fetchLocation();
  }, []);

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const stime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  const end = new Date();
  end.setHours(23, 59, 0, 0);
  const endFormatted = new Date(end.getTime() - end.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  const [Booking, setBooking] = useState({
    locationId: 0,
    slotId: 0,
    slotType: "",
    startTime: stime,
    endTime: endFormatted,
  });

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => {
      let newBooking = {
        ...prev,
        [name]: name === "locationId" ? Number(value) : value,
      };

      return newBooking;
    });
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
        localStorage.setItem("slotdata", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(
    () => {
      localStorage.setItem("bookingStartTime", Booking.startTime);
      localStorage.setItem("bookingEndTime", Booking.endTime);
    },
    [Booking.startTime],
    [Booking.endTime]
  );

  const ISsumbit = (e) => {
    e.preventDefault();
    if (Booking.locationId && Booking.slotType) {
      localStorage.setItem("locataion", JSON.stringify(Booking.locationId));
      navigate("/searchparking");
    } else {
      alert("Enter Location And SlotType First!");
    }
  };
  return (
    <>
      <section className="hero-section text-center mb-5 fade-in">
        <h1>Find & Reserve Parking Slots Easily</h1>
        <p>
          SmartPark helps you locate available parking and book in advance to
          save time and avoid hassle.
        </p>

        <form
          className="row g-3 justify-content-center mt-4"
          onSubmit={ISsumbit}
        >
          <div className="col-md-5 col-lg-3">
            <label htmlFor="StartTime">Start Time</label>
            <input
              id="StartTime"
              type="datetime-local"
              className="form-control"
              value={Booking.startTime}
              onChange={(e) => {
                const newStartTime = e.target.value;
                setBooking((prev) => ({
                  ...prev,
                  startTime: newStartTime,
                }));
                console.log("---", newStartTime);
                localStorage.setItem("bookingStartTime", newStartTime);
              }}
            />
          </div>

          <div className="col-md-5 col-lg-3">
            <label htmlFor="StartTime">End Time</label>
            <input
              id="EndTime"
              type="datetime-local"
              className="form-control"
              value={Booking.endTime}
              onChange={(e) => {
                const EndTime = e.target.value;
                setBooking((prev) => ({
                  ...prev,
                  endTime: EndTime,
                }));
                console.log("---", EndTime);
                localStorage.setItem("bookingEndTime", EndTime);
              }}
            />
          </div>

          <div className="col-md-5 col-lg-3">
            <label htmlFor="LocationDropdown">Location</label>
            <select
              id="LocationDropdown"
              className="form-select"
              name="locationId"
              value={Booking.locationId}
              onChange={changeHandle}
            >
              <option value="">-- Select Location --</option>
              {Location.map((curElem) => (
                <option key={curElem.locationId} value={curElem.locationId}>
                  {curElem.locationName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-5 col-lg-3">
            <label htmlFor="SlotTypeDropdown">Slot Type</label>
            <select
              id="SlotTypeDropdown"
              className="form-select"
              value={Booking.slotType}
              onChange={(e) =>
                setBooking({ ...Booking, slotType: e.target.value })
              }
            >
              <option value="">-- Select Slot Type --</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Bus">Bus</option>
              <option value="VIP_Car">VIP Car</option>
            </select>
          </div>
          <div className="col-md-10 col-lg-3 mt-4">
            <button
              id="SearchParking"
              type="submit"
              className="btn btn-primary w-100 py-3"
            >
              <i className="bi bi-search me-2"></i>Search Parking
            </button>
          </div>
        </form>
      </section>

      <section className="features-section row text-center mb-5 fade-in">
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card p-4">
            <div className="mb-3">
              <i className="bi bi-speedometer2"></i>
            </div>
            <h5>Real-Time Availability</h5>
            <p>See parking slots updated live to avoid searching endlessly.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card p-4">
            <div className="mb-3">
              <i className="bi bi-calendar-check"></i>
            </div>
            <h5>Easy Booking</h5>
            <p>Reserve your parking slot in advance with just a few clicks.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card p-4">
            <div className="mb-3">
              <i className="bi bi-clock"></i>
            </div>
            <h5>Timer & Billing</h5>
            <p>Track your parking time and get billed accordingly.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card p-4">
            <div className="mb-3">
              <i className="bi bi-gear"></i>
            </div>
            <h5>Admin Management</h5>
            <p>Admins can easily manage parking slots and availability.</p>
          </div>
        </div>
      </section>

      <section className="mb-5 how-it-works fade-in">
        <h2 className="text-center mb-5">How It Works</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div
                className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "var(--primary-light) !important",
                }}
              >
                <i
                  className="bi bi-search text-primary"
                  style={{ fontSize: "2rem" }}
                ></i>
              </div>
              <h4>1. Search</h4>
              <p>
                Enter your location and Slot Type to find available parking.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div
                className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "var(--primary-light) !important",
                }}
              >
                <i
                  className="bi bi-bookmark-check text-primary"
                  style={{ fontSize: "2rem" }}
                ></i>
              </div>
              <h4>2. Book</h4>
              <p>Select your preferred slot and reserve it instantly.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div
                className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "var(--primary-light) !important",
                }}
              >
                <i
                  className="bi bi-credit-card text-primary"
                  style={{ fontSize: "2rem" }}
                ></i>
              </div>
              <h4>3. Park & Pay</h4>
              <p>Enjoy hassle-free parking with timer and billing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center fade-in">
        <div className="btn-group">
          <Link as={Link} to="/login" className="btn btn-primary btn-lg">
            Admin/User Login
          </Link>
          <Link as={Link} to="/register" className="btn btn-primary btn-lg">
            User Register
          </Link>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
