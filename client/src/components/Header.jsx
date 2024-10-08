import React from "react";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.log("Logout failled", error);
    }
  };

  return (
    <>
      <Navbar
        className="nav-bg position-sticky top-0 w-100 z-1"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand>
            <Link className="text-decoration-none brand" to="/">
              MY BLOG
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link className="text-decoration-none m-3 nav_link" to="/">
                Blogs
              </Link>
            </Nav>
            <Nav>
              <Link className="text-decoration-none m-3 nav_link" to="/tech">
                Tech
              </Link>
            </Nav>
            <Nav>
              <Link className="text-decoration-none m-3 nav_link" to="/others">
                Others
              </Link>
            </Nav>
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="user-dropdown"
                  className="nav-link text-decoration-none m-3"
                  aria-label="User Options"
                >
                  <FaRegUser />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/register">
                    Register
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/login">
                    Login
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
