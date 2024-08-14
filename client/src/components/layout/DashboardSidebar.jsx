import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaHome, FaTachometerAlt, FaTable, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function DashboardSidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3  text-bg-dark"
      style={{ width: "280px", height: "100%" }}
    >
      <Navbar.Brand
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi pe-none me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
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
            Home
          </Link>
        </Nav>
        <Nav>
          <Link to="" className="text-white text-decoration-none ms-3 mb-3">
            <FaTachometerAlt className="me-2 " />
            Dashboard
          </Link>
        </Nav>
      </Nav>
    </div>
  );
}

export default DashboardSidebar;
