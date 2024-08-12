import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async(e) =>{
    e.preventDefault();
    try {
      

      navigate('/')
    } catch (error) {
      
    }
  }

  return (
    <>
    <main>
        <Container className="d-flex justify-content-center container ">
          <h4 className="text-center d-flex mb-3">My blog</h4>
          <Form onSubmit={handleLogin} className="form p-5 w-100">
            <h5 className="text-center">Login</h5>
            <Form.Group className="my-3">
              <Form.Label>
                Email address<span className="required text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@email.com"
                onChange={(e)=> setEmail(e.target.value)}
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
                onChange={(e)=> setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 btn">Login</Button>
            <p className="mt-3 text-success">
              Not registered yet?
              <Link to="/register" className="ms-2">
                Register here
              </Link>
            </p>
          </Form>
        </Container>
      </main>
    
    </>
  )
}

export default Login