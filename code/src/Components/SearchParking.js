import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchParking = () => {
  const navigate = useNavigate();
  const [Slot, SetSlot] = useState([]);
  const [Location, setLocation] = useState("");
  const [slottype, setslottype] = useState("");

  const slotdata = JSON.parse(localStorage.getItem("slotdata"));
  const locataion = JSON.parse(localStorage.getItem("locataion") || "");
  const bookingStartTime = localStorage.getItem("bookingStartTime");
  const bookingEndTime = localStorage.getItem("bookingEndTime");
  const Users = localStorage.getItem("user");

  console.log("----", bookingStartTime);
  console.log("bookingEndTime..", bookingEndTime);
  let slotid;
  if (slotdata) {
    slotid = slotdata[0].slotId;
  }

  useEffect(() => {
    if (slotdata) {
      SetSlot(slotdata);
    }
    if (locataion) {
      try {
        axios
          .get(`http://localhost:5266/api/Location/${locataion}`)
          .then((respose) => {
            setLocation(respose.data.value.name);
            console.log(respose.data.value.name);
          });
      } catch (error) {
        console.log(error);
      }
    }

    if (slotid) {
      try {
        axios
          .get(`http://localhost:5266/api/Slots/${slotid}`)
          .then((respose) => {
            setslottype(respose.data.value.slotType);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  console.log("slot", Slot);

  const savedata = (slotid) => {
    const slotData = {
      StartTime: bookingStartTime,
      EndTime: bookingEndTime,
      Location: locataion,
      SlotId: slotid,
      SlotType: slottype,
    };
    localStorage.setItem("SelectData", JSON.stringify(slotData));
    console.log(slotData);
    if (Users) {
      navigate("/userhome/bookslot");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="text-primary">Available Parking Slots</h2>
              <p id="search-info" className="text-muted">
                Showing available slots for Location : {Location}, Type:{" "}
                {slottype}
              </p>
            </div>
          </div>

          <div className="row">
            {Slot.map((Element, index) => (
              <div key={index} className="col-md-3 mb-3">
                <div className="card ">
                  <div className="card-body">
                    <h5 className="card-title">Slot {Element.slotNumber}</h5>
                    <p
                      className={
                        Element.isAvailable ? "text-success" : "text-danger"
                      }
                    >
                      Type: {slottype} | Status:{" "}
                      {Element.isAvailable ? "Available" : "Occupied"}
                    </p>
                    {Element.isAvailable ? (
                      <button
                        className="btn btn-success"
                        onClick={() => savedata(Element.slotId)}
                      >
                        Book Slot
                      </button>
                    ) : (
                      <div className=" mb-2">
                        {Element.bookingconflicts.map((conflict, index) => (
                          <div key={index} className="mb-3">
                            <span className="badge bg-secondary">
                              Booked:
                              {new Date(
                                conflict.bookingStartTime
                              ).toLocaleDateString()}
                            </span>
                            <br />
                            <span className="badge bg-light text-dark">
                              Time: {""}
                              {new Date(
                                conflict.bookingStartTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              -- {""}
                              {new Date(
                                conflict.bookingEndTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <br />
                            <span className="badge bg-light text-dark">
                              Booked Status: {conflict.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div class="mt-2">
            <span class="badge bg-secondary">Booked: $date</span>
            <br />
            <span class="badge bg-light text-dark">Time: star - en</span>
            <br />
            <span class="badge bg-light text-dark">
              Booking Status: $every.status
            </span>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default SearchParking;
