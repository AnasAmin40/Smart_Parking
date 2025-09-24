import AdminDashboard from "../Components/Admin/AdminDashboard";
import AdminNavBar from "../Components/Admin/AdminNavBar";
import Sidebar from "../Components/Admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminHome = () => {
  return (
    <>
      <AdminNavBar />
      <div>
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminHome;
