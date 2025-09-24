import AdminNavBar from "../Components/Admin/AdminNavBar";
import USideBar from "../Components/User/USideBar";
import { Outlet } from "react-router-dom";

const UserHome = () => {
  return (
    <>
      <AdminNavBar />
      <div>
        <USideBar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserHome;
