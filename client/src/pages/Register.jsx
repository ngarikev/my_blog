import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const username = `${fname} ${lname}`; 
    
    try {
      const response = await axios.post("http://localhost:5000/register", {
      username,
      email,
      password,
    });
    console.log(response);
    
      navigate("/login");
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center register ">
          <h4 className="text-center d-flex mb-3">My blog</h4>
          <Form onSubmit={handleRegister} className="form p-5 w-100">
            <h5 className="text-center">Register</h5>
            <Row className="mb-3 row">
              <Form.Group as={Col} controlId="formGridfName">
                <Form.Label>
                  First Name<span className="required text-danger">*</span>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridlName">
                <Form.Label className="last-name">
                  Last Name<span className="required text-danger ">*</span>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="my-3">
              <Form.Label>
                Email address<span className="required text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>
                Password<span className="required text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 btn">
              Register
            </Button>
            <p className="mt-3 text-success">
              Already have an account?
              <Link className="ms-2" to="/login">
                Login here
              </Link>
            </p>
          </Form>
        </Container>
      </main>
    </>
  );
}

export default Register;
