import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const UserBookingHistory = () => {
  const [Data, SetData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user.userID;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5266/api/Booking/AllBooking`);
        const result = await res.json();
        const data = result.value;

        const userhistory = data.filter((d) => d.userId === userid);
        SetData(userhistory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      id: "bookingId",
      name: "Booking ID",
      selector: (row) => row.bookingId,
      sortable: true,
    },
    { name: "Location", selector: (row) => row.parkingLocation?.name },

    { name: "Slot", selector: (row) => row.parkingSlot?.slotNumber },
    { name: "Type", selector: (row) => row.parkingSlot?.slotType },
    {
      name: "Start Time",
      selector: (row) =>
        new Date(row.startTime).toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      wrap: true,
      minWidth: "200px",
    },
    {
      name: "Exit Time",
      selector: (row) =>
        new Date(row.exitTime).toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      wrap: true,
      minWidth: "200px",
    },

    {
      name: "Status",
      cell: (row) => (
        <span
          className={`badge ${
            row.status === "Completed" ? "bg-success" : "bg-warning text-dark"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#0d6efd",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        minHeight: "55px",
        fontSize: "16px",
        padding: "12px",
      },
    },
    cells: {
      style: {
        paddingLeft: "15px",
        paddingRight: "15px",
      },
    },
  };

  const filteredData = Data.filter(
    (item) =>
      item.bookingId.toString().includes(filterText.toLowerCase()) ||
      item.parkingLocation?.name
        ?.toLowerCase()
        .includes(filterText.toLowerCase()) ||
      item.parkingSlot?.slotNumber
        ?.toLowerCase()
        .includes(filterText.toLowerCase()) ||
      item.parkingSlot?.slotType
        ?.toLowerCase()
        .includes(filterText.toLowerCase())
  );
  return (
    <>
      <div className="content-area" id="contentArea">
        <h2 className="mb-4">Booking History</h2>
        <input
          type="text"
          placeholder="Search bookings..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
        />
        <DataTable
          title="Booking History"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          customStyles={customStyles}
          defaultSortFieldId="bookingId"
          defaultSortAsc={false}
        />
      </div>
    </>
  );
};

export default UserBookingHistory;
