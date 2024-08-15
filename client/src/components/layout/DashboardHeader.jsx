import axios from "axios";
import React from "react";
import { Container, Row, Col, Nav, Form, Button, Dropdown } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function DashboardHeader() {

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
  }
  return (
    <header className=" text-bg-dark">
     <Container fluid>
      <Row className="d-flex align-items-center justify-content-end">
        {/* Navigation and Buttons Section */}
        <Col xs="auto" className="d-flex align-items-center justify-content-end">
          <Nav className="me-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="px-2 text-decoration-none text-white">
                Home
              </Nav.Link>
            </Nav.Item>
            {/* Add more Nav.Items as needed */}
          </Nav>
          <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="user-dropdown"
                  className="nav-link text-decoration-none m-3"
                >
                  <FaRegUser />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
        </Col>
      </Row>
    </Container>
    </header>
  );
}

export default DashboardHeader;
