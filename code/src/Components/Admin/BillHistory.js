import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const BillingHistory = () => {
  const [Data, SetData] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5266/api/Booking/GetBillList`
        );
        console.log(response.data.value);
        SetData(response.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      id: "billId",
      name: "BILL ID",
      selector: (row) => row.billId,
      sortable: true,
    },
    { name: "BOOKING ID", selector: (row) => row.bookingId, sortable: true },
    { name: "USER", selector: (row) => row.user?.name, sortable: true },
    { name: "LOCATION", selector: (row) => row.parkingLocation?.name },
    { name: "NUMBER", selector: (row) => row.parkingSlot?.slotNumber },
    { name: "TYPE", selector: (row) => row.parkingSlot?.slotType },
    { name: "HOUR", selector: (row) => `${row.durationInHours} Hour` },
    { name: "AMOUNT", selector: (row) => `Rs. ${row.amount}`, sortable: true },

    {
      name: "CREATED AT",
      selector: (row) =>
        new Date(row.createdAt).toLocaleString("en-GB", {
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
  ];

  // Search filter
  const filteredData = Data.filter(
    (item) =>
      item.billId.toString().includes(filterText.toLowerCase()) ||
      item.bookingId.toString().includes(filterText.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.parkingLocation?.name
        ?.toLowerCase()
        .includes(filterText.toLowerCase()) ||
      item.parkingSlot?.slotNumber
        ?.toLowerCase()
        .includes(filterText.toLowerCase())
  );

  return (
    <div className="content-area" id="contentArea">
      <h2 className="mb-4">Billing History</h2>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#0d6efd",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
            },
          },
          rows: {
            style: {
              minHeight: "50px",
              fontSize: "15px",
            },
          },
        }}
        defaultSortFieldId="billId"
        defaultSortAsc={false}
      />
    </div>
  );
};

export default BillingHistory;
