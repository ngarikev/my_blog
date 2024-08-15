import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function DashboardContent({ cards }) {
  return (
    <>
      <div className="dashboard mt-5 ">
        <h2 className="text-black border-bottom border-dark text-center ">
          Dashboard
        </h2>
      </div>
      <Container>
        <Row className="g-5 m-5">
          {cards.map((card, index) => (
            <Col key={index} lg={6} md={6} sm={12}>
              <Link to={card.link} className="text-decoration-none">
                <div className={`card d-card ${card.bgColor}`}>
                  <div className="card-body text-center">
                    <h6>{card.title}</h6>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default DashboardContent;
