import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css"; // You can create a CSS file for styling

const Navbar = ({ navItems, navTitle }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  if (navItems === null) {
    return;
  }

  return (
    <div className={`navbar ${showMobileMenu ? "active" : ""}`}>
      <div className="navbar-title">
        <h2 className="fancy-font">
          <Link
            to={"/"}
            className={`header ${
              location.pathname === "/" ? "active-page" : ""
            }`}
          >
            {navTitle}
          </Link>
        </h2>
      </div>
      <div
        className={`navbar-links fancy-font ${showMobileMenu ? "active" : ""}`}
      >
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.slug}
                className={
                  location.pathname.substring(1) === item.slug
                    ? "active-page"
                    : ""
                }
              >
                {item.header}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="burger-menu" onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
