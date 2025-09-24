import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const UserManager = () => {
  const [Data, SetData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5266/api/Users`);
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
      //   id: "id",
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    { name: "NAME", selector: (row) => row.name, sortable: true },
    { name: "EMAIL", selector: (row) => row.email },
    { name: "MOBILE", selector: (row) => row.mobileNumber },
    { name: "ROLE", selector: (row) => row.role?.roles },
    {
      name: "ACTIONS",
      cell: (row) => (
        <button
          className="btn btn-sm btn-warning"
          onClick={() => handleEdit(row)}
        >
          ✏️
        </button>
      ),
    },
  ];

  // Search filter
  const filteredData = Data.filter(
    (item) =>
      item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.mobileNumber?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.role?.roles?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEdit = (user) => {
    console.log("Edit clicked for user", user);
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const saveUser = async (user) => {
    try {
      const response = await fetch(
        `http://localhost:5266/api/Users/UpdateUser/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        alert("User updated successfully!");
        // Update local data state
        SetData((prevData) =>
          prevData.map((u) => (u.id === user.id ? user : u))
        );
        setIsEditModalOpen(false);
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="content-area" id="contentArea">
        {isEditModalOpen && selectedUser && (
          <div className="modal">
            <h2>Edit User</h2>
            <form>
              <label>Name</label>
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />

              <label>Email</label>
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />

              <label>Mobile</label>
              <input
                type="text"
                value={selectedUser.mobileNumber}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    mobileNumber: e.target.value,
                  })
                }
              />

              <button type="button" onClick={() => saveUser(selectedUser)}>
                Save
              </button>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        <h2 className="mb-4">User Manager</h2>
        <input
          type="text"
          placeholder="Search user..."
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
          defaultSortFieldId="id"
          defaultSortAsc={false}
        />
      </div>
    </>
  );
};

export default UserManager;
