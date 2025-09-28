import Header from "./Header";
import "../index.css";
import { Link, useNavigationType } from "react-router-dom";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandel = async (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      const data = {
        email: user.email,
        password: user.password,
      };
      try {
        const response = await fetch(
          "http://localhost:5266/api/UserAuthentication/UserLogin",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response) {
          throw new Error("Network Response was not work");
        }
        const select = localStorage.getItem("SelectData");
        const result = await response.json();
        console.log("Result", result);
        if (result.token) {
          localStorage.setItem("user", JSON.stringify(result));
          if (select) {
            navigate("/userhome/bookslot");
          } else {
            if (result.role === "Admin") {
              navigate("/adminhome");
            } else {
              navigate("/userhome");
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="auth-container">
        <div className="auth-form fade-in" id="loginForm">
          <h3>
            <i className="bi bi-key"></i> Login Your Account
          </h3>

          <form onSubmit={submitHandel}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-control"
                value={user.email}
                onChange={changeHandler}
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
                id="loginPassword"
                value={user.password}
                onChange={changeHandler}
                required
              />
              <div className="text-danger mt-1"></div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              SIGN IN
            </button>
          </form>

          <div className="auth-footer mt-3">
            <span>Don't have an account? </span>
            <Link as={Link} to="/register" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
