import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const UserManager = () => {
  const [Data, SetData] = useState([]);
  const [Roles, SetRoles] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5266/api/Users`);
      SetData(response.data.value);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`http://localhost:5266/api/Role`);
        SetRoles(response.data.value);
        console.log(response.data.value);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchRoles();
  }, []);

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "80px" },
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
    setSelectedUser({
      ...user,
      password: "",
      confirmPassword: "",
    });
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser({
      id: 0,
      name: "",
      email: "",
      mobileNumber: "",
      roleId: 0,
    });
    setIsEditModalOpen(true);
  };

  const saveUser = async (user) => {
    let response;
    if (user.id) {
      try {
        response = await fetch(
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
          fetchData();
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
    } else {
      if (user.password !== user.confirmPassword) {
        alert("Password must be same");
      }
      try {
        console.log("add user, ", user);
        response = await fetch(`http://localhost:5266/api/Users/AddUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          fetchData();
          setIsEditModalOpen(false);
        } else {
          alert("Failed to save user.");
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <div className="content-area" id="contentArea">
        {isEditModalOpen && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsEditModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={selectedUser.name}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          name: e.target.value,
                        })
                      }
                    />

                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control mb-2"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />

                    <label>Mobile</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={selectedUser.mobileNumber}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          mobileNumber: e.target.value,
                        })
                      }
                    />
                    {selectedUser.id === 0 && (
                      <>
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control mb-2"
                          value={selectedUser.password}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              password: e.target.value,
                            })
                          }
                        />

                        <label>Confirm Password</label>
                        <input
                          type="password"
                          className="form-control mb-2"
                          value={selectedUser.confirmPassword}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </>
                    )}

                    <label>Role</label>
                    <select
                      className="form-control mb-2"
                      value={selectedUser.roleId || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          roleId: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="">-- Select Role --</option>
                      {Roles.map((r) => (
                        <option key={r.roleId} value={r.roleId}>
                          {r.roles}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => saveUser(selectedUser)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
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
        <button
          className=" d-flex justify-content-end btn btn btn-success "
          onClick={() => handleAdd()}
        >
          + Add New User
        </button>
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
