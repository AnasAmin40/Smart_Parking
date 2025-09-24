import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLocation } from "react-router-dom";

const USideBar = () => {
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
                  to="/userhome/userdashboard"
                  end
                  className={({ isActive, Location }) =>
                    navClass(isActive || location.pathname === "/userhome")
                  }
                >
                  <i className="bi bi-speedometer2"></i>
                  {/* <i className="bi bi-geo-alt"></i> */}
                  <span>User Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/userhome/bookslot"
                  end
                  className={({ isActive }) => navClass(isActive)}
                >
                  <i className="bi bi-journal-check"></i>
                  <span>Book Slot</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/userhome/activebooking"
                  end
                  className={({ isActive }) => navClass(isActive)}
                >
                  <i className="bi bi-list-check"></i>
                  <span>Current Booking</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/userhome/upcomingbookings"
                  end
                  className={({ isActive }) => navClass(isActive)}
                >
                  <i className="bi bi-receipt"></i>
                  <span>Upcoming Booking</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/userhome/userbookinghistory"
                  end
                  className={({ isActive }) => navClass(isActive)}
                >
                  <i className="bi bi-people"></i>
                  <span>Booking History</span>
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <Link
                  to="/settings"
                  className="nav-link d-flex align-items-center"
                >
                  <i className="bi bi-gear"></i>
                  <span>Settings</span>
                </Link>
              </li> */}
              <li className="nav-item mt-2">
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
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default USideBar;
