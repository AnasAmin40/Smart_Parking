import { Navbar, Nav, Container } from "react-bootstrap";
import Login from "./Login.js";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="/adminhome">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/userhome">
              User
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
