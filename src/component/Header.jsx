// src/components/Header.jsx
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "./context/CartContext.jsx";
import { ToggleContext } from "./context/ToogleBtn.jsx";
import { FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const { totalItems } = useContext(CartContext);
  const { isDark, toggleMode } = useContext(ToggleContext);

  return (
    <header
      className={`shadow-sm animate__animated animate__fadeInLeft ${isDark ? "bg-dark" : "bg-white"}`}
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }} // <- Fixed navbar
    >
      <div className="container py-2">
        <nav className="navbar navbar-expand-md p-0">
          <Link
            to="/"
            className={`navbar-brand fw-bold ${isDark ? "text-white" : "text-primary"}`}
            style={{ textDecoration: "none", fontSize: "1.3rem", letterSpacing: "1px" }}
          >
            ShopSphere
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className={`navbar-toggler-icon ${isDark ? "invert" : ""}`}></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="navbar-nav ms-auto align-items-center">
              <NavLink to="/" className={`nav-link ${isDark ? "text-white" : "text-dark"}`} end>
                Home
              </NavLink>
              <NavLink to="/cart" className={`nav-link position-relative ${isDark ? "text-white" : "text-dark"}`}>
                <FaShoppingCart />
                <span className="ms-1">Cart</span>
                {totalItems > 0 && (
                  <span className={`badge rounded-pill ms-2 ${isDark ? "bg-light text-dark" : "bg-danger"}`}>
                    {totalItems}
                  </span>
                )}
              </NavLink>
              <NavLink to="/checkout" className={`nav-link ${isDark ? "text-white" : "text-dark"}`}>
                Checkout
              </NavLink>

              <button
                onClick={toggleMode}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "100%",
                  width: "36px",
                  height: "36px",
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: isDark ? "white" : "black",
                  transition: "all 0.3s ease",
                  marginLeft: "0.5rem"
                }}
              >
                {isDark ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
