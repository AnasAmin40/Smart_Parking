import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navClass = (isActive, extra = "") =>
    `nav-link d-flex align-items-center${isActive ? " active" : ""}${
      extra ? " " + extra : ""
    }`;
  return (
    <>
      <div className="main-container">
        <nav className="sidebar" id="sidebar">
          <div className="sidebar-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink
                  to="/adminhome/admindasboard"
                  end
                  className={({ isActive }) =>
                    navClass(isActive || location.pathname === "/adminhome")
                  }
                >
                  <i className="bi bi-speedometer2"></i>
                  <span>Admin Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/adminhome/bookingmanager"
                  end
                  className={({ isActive }) => navClass(isActive)}
                >
                  <i className="bi bi-journal-check"></i>
                  <span>Bookings Manage</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/adminhome/bookinghistory"
                  end
                  className={({ isActive }) => navClass(isActive)}
                >
                  <i className="bi bi-list-check"></i>
                  <span>Bookings History</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/adminhome/billinghistory"
                  end
                  className={({ isActive }) => navClass(isActive)}
                >
                  <i className="bi bi-receipt"></i>
                  <span>Billing History</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/adminhome/usermanage"
                  end
                  className={({ isActive }) => navClass(isActive)}
                >
                  <i className="bi bi-people"></i>
                  <span>Users Manage</span>
                </NavLink>
              </li>

              <NavLink
                className={({ isActive }) =>
                  "nav-link d-flex align-items-center text-danger" +
                  (isActive ? "active" : "")
                }
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Log Out</span>
              </NavLink>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
