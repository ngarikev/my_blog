import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dashboard/users/${id}`);

        const { username, email, role } = response.data;

        const [firstName, lastName] = username.split(" ");
        setFname(firstName);
        setLname(lastName);
        setEmail(email);
        setRole(role);

      } catch (error) {
        console.log(error)
      }

    }
    fetchUserDetail()

  }, [id])

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const username = `${fname} ${lname}`
    try {
      await axios.put(`http://localhost:5000/dashboard/users/update-user/${id}`, {
        username,
        email,
        role
      });
      alert("User updated successfully")
      navigate('/dashboard/users')
    } catch (error) {
      console.log("Error updating user", error);
    }
  };
  return (
    <>
      <main>
        <Container className="d-flex justify-content-center register text-black  ">
          <h4 className="text-center d-flex mb-3">Add User</h4>
          <Form onSubmit={handleUpdateUser} className="form p-5 w-100 mb-5">
            <h5 className="text-center">User Details</h5>
            <Row className="mb-3 row">
              <Form.Group as={Col} controlId="formGridfName">
                <Form.Label>
                  First Name<span className="required text-danger">*</span>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={fname}
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
                  value={lname}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

           {/* <Form.Group className="my-3">
              <Form.Label>
                Password<span className="text-danger"></span>{" "}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>*/}
            <Form.Group className="mb-3">
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className=" btn">
            Update User
            </Button>
          </Form>
        </Container>
      </main>
    </>
  );
}

export default UpdateUser;
