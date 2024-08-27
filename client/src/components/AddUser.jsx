import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function AddUser() {
  const handleAddUser = async (e) => {
    e.preventDefault();
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
              <Form.Select
                onChange={(e) => setCategory(e.target.value)}
              >
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
