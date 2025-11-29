import React, { useEffect, useState } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/logo.jpg";
import { useUserContext } from "../context/UserContext";
import Model from "../components/Model";

const NavBar: React.FC = () => {
  const { handleShow, show } = useUserContext();
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(token ? true : false);
  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      window.location.href = "/";
    } else {
      handleShow();
    }
  };

  useEffect(() => {
    setIsLoggedIn(token ? true : false);
  }, [token]);
  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="shadow-sm py-2"
      sticky="top"
    >
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            height={45}
            width={45}
            className="rounded-circle me-2"
          />
          <span className="fw-bold text-primary">RecipeHub</span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="navbarNav" />

        {/* Nav Links */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-lg-center text-center text-lg-start">
            <Link
              to="/"
              className="mx-lg-2 link-underline link-underline-opacity-0 "
            >
              Home
            </Link>
            <Link
              to={isLoggedIn ? "/recipes" : "/"}
              className="mx-lg-2 link-underline link-underline-opacity-0"
              onClick={!isLoggedIn ? handleShow : undefined}
            >
              My Recipes
            </Link>
            <Link
              to="/contact"
              className="mx-lg-2 link-underline link-underline-opacity-0"
            >
              Contact
            </Link>

            {/* Login Button (stays at bottom on mobile, inline on desktop) */}
            <div className="mt-3 mt-lg-0">
              <Button
                variant="primary"
                className="px-3 ms-2 fw-semibold"
                onClick={isLoggedIn ? handleLogout : handleShow}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </Button>
            </div>
            {show && <Model />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
