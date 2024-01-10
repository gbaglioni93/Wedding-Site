import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ navItems, navTitle }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is 768 pixels or less
      setIsMobileScreen(window.innerWidth <= 800);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check when the component mounts
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // If web, then always needs to be active.
  // If mobile, then needs to be active only when active
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  if (navItems === null) {
    return;
  }

  return (
    <div className={`navbar`}>
      {/* ${showMobileMenu ? "active" : ""} */}
      <div className="navbar-title">
        <h2 className="fancy-font">
          <Link
            to={"/"}
            className={`header ${
              location.pathname === "/" ? "selected-page" : ""
            }`}
          >
            {navTitle}
          </Link>
        </h2>
      </div>
      {!isMobileScreen || (showMobileMenu && isMobileScreen) ? (
        <div
          className={
            `navbar-links fancy-font`
            //  ${showMobileMenu ? "active" : ""}
          }
        >
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.slug}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className={
                    location.pathname.substring(1) === item.slug
                      ? "selected-page"
                      : ""
                  }
                >
                  {item.header}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/gallery"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={
                  location.pathname.substring(1) === "gallery"
                    ? "selected-page"
                    : ""
                }
              >
                GALLERY
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
      <div className="burger-menu" onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
