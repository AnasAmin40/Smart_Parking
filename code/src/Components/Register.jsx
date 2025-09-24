import Header from "./Header";
import "../index.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const HandelInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const userToSend = {
      name: user.name,
      email: user.email,
      mobileNumber: user.mobile,
      password: user.password,
      confirmPassword: user.confirmPassword,
    };
    console.log("Form data submitted:", user);
    try {
      const response = await fetch(
        "http://localhost:5266/api/Users/AddNewUserByUser",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userToSend),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <main class="auth-container">
        <div className="auth-form fade-in" id="registerForm">
          <h3>
            <i className="bi bi-person-plus"></i>Create Your Account
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-control"
                value={user.name}
                onChange={HandelInputChange}
                required
              />
              <div className="text-danger mt-1"></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-control"
                value={user.email}
                onChange={HandelInputChange}
                required
              />
              <div className="text-danger mt-1"></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                className="form-control"
                value={user.mobile}
                onChange={HandelInputChange}
                required
              />
              <div className="text-danger mt-1"></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control"
                value={user.password}
                onChange={HandelInputChange}
                required
              />
              <div className="text-danger mt-1"></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-control"
                value={user.confirmPassword}
                onChange={HandelInputChange}
                required
              />
              <div className="text-danger mt-1"></div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              REGISTER
            </button>
          </form>

          <div className="auth-footer mt-3">
            <span>Already have an account? </span>
            <Link as={Link} to="/login" className="auth-link">
              Login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
