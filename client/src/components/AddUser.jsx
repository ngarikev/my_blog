import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Axios  from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();

    const username = `${fname} ${lname}`;

    const newUser = {
      username,
      email,
      password,
      role
    }

    try {
      const response = await Axios.post(
        "http://localhost:5000/register",
       newUser, { 
          withCredentials: true 

        });
      alert("Successfully created a new user");
      navigate("/dashboard/users");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center register text-black  ">
          <h4 className="text-center d-flex mb-3">Add User</h4>
          <Form onSubmit={handleAddUser} className="form p-5 w-100 mb-5">
            <h5 className="text-center">User Details</h5>
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
            <Form.Group className="mb-3">
              <Form.Select onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className=" btn">
              Add User
            </Button>
          </Form>
        </Container>
      </main>
    </>
  );
}

export default AddUser;
