import React from 'react';
import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import { FaBootstrap } from 'react-icons/fa';

function DashboardHeader() {
  return (
    <header className="p-3 text-bg-dark">
      <Container>
        <Row className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Col xs="auto" className="d-flex align-items-center mb-2 mb-lg-0">
            <a href="/" className="d-flex align-items-center text-white text-decoration-none">
              <FaBootstrap size={40} className="me-2" />
            </a>
          </Col>

          <Col xs={12} lg="auto" className="mb-2 justify-content-center mb-md-0">
            <Nav className="nav justify-content-center">
              <Nav.Link href="#" className="px-2 text-secondary">Home</Nav.Link>
              <Nav.Link href="#" className="px-2 text-white">Features</Nav.Link>
              <Nav.Link href="#" className="px-2 text-white">Pricing</Nav.Link>
              <Nav.Link href="#" className="px-2 text-white">FAQs</Nav.Link>
              <Nav.Link href="#" className="px-2 text-white">About</Nav.Link>
            </Nav>
          </Col>

          <Col xs={12} lg="auto" className="mb-3 mb-lg-0 me-lg-3">
            <Form role="search">
              <Form.Control
                type="search"
                className="form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </Form>
          </Col>

          <Col xs="auto" className="text-end">
            <Button variant="outline-light" className="me-2">Login</Button>
            <Button variant="warning">Sign-up</Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default DashboardHeader