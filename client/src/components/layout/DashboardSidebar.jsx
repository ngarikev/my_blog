import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaHome, FaTachometerAlt, FaTable, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function DashboardSidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3  text-bg-dark"
      style={{ width: "230px", height: "100%" }}
    >
      <Navbar.Brand
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Admin Dashboard</span>
      </Navbar.Brand>
      <hr />
      <Nav className="nav-pills flex-column mb-auto mt-4">
        <Nav>
          <Link
            to="/dashboard"
            className="active text-decoration-none text-white ms-3 mb-3"
            aria-current="page"
          >
            <FaHome className="me-2" />
            Dashboard
          </Link>
        </Nav>
        <br />
        <hr />
        <Nav>
          <Link className="text-decoration-none text-white m-3" to="create-blog">
            Create Blog
          </Link>
        </Nav>
      </Nav>
    </div>
  );
}

export default DashboardSidebar;
