import { Navbar, Nav, Container } from "react-bootstrap";
import Login from "./Login.js";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar
      style={{ background: "#8fc96b" }}
      expand="lg"
      className="custom-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          SmartPark Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          {!storedUser ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          ) : (
            <>
              {storedUser.role === "User" && (
                <>
                  <Nav.Link disabled>
                    Wellcome, {storedUser.username} !
                  </Nav.Link>
                  <Nav.Link as={Link} to="/userhome">
                    User Dashboard
                  </Nav.Link>

                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              )}
              {storedUser.role === "Admin" && (
                <>
                  {/* If currently on Admin Dashboard → show User + Email + Logout */}
                  {location.pathname.startsWith("/adminhome") ? (
                    <>
                      <Nav.Link disabled>
                        Wellcome, {storedUser.username} !
                      </Nav.Link>
                      <Nav.Link as={Link} to="/userhome">
                        User Dashboard
                      </Nav.Link>

                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                  ) : location.pathname.startsWith("/userhome") ? (
                    /* If currently on User Dashboard → show Admin + Email + Logout */
                    <>
                      <Nav.Link disabled>
                        Wellcome, {storedUser.username} !
                      </Nav.Link>
                      <Nav.Link as={Link} to="/adminhome">
                        Admin Dashboard
                      </Nav.Link>

                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                  ) : (
                    /* Agar home page ya kahin aur ho → dono dashboards + Logout */
                    <>
                      <Nav.Link as={Link} to="/adminhome">
                        Admin Dashboard
                      </Nav.Link>
                      <Nav.Link as={Link} to="/userhome">
                        User Dashboard
                      </Nav.Link>
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
