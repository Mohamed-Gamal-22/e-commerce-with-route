import React, { useContext } from "react";
// import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext.js";

export default function Navbar() {
  let navigate = useNavigate();
  const { userToken, setUserToken } = useContext(UserContext);

  function logout() {
    localStorage.removeItem("authToken");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="my logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                    Cart
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              {userToken ? (
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logout}>
                    LogOut
                  </span>
                </li>
              ) : (
                <>
                  <div className="d-flex align-items-center">
                    <li className="nav-item">
                      <i className="fa-brands fa-facebook"></i>
                    </li>
                    <li className="nav-item mx-3">
                      <i className="fa-brands fa-youtube"></i>
                    </li>
                    <li className="nav-item">
                      <i className="fa-brands fa-tiktok"></i>
                    </li>
                    <li className="nav-item mx-3">
                      <i className="fa-brands fa-instagram"></i>
                    </li>
                    <li className="nav-item">
                      <i className="fa-brands fa-linkedin"></i>
                    </li>
                  </div>
                  <li className="nav-item ms-3">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
