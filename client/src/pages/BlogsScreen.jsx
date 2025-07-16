import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Loader from "../components/Loader";

const baseURL = import.meta.env.VITE_API_URL;

function HomeScreen() {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${baseURL}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`${baseURL}/users`);
        setCurrentUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
    fetchUser();
  }, []);
  
  return (
    <>
      <main>
        <Header />
        <Container>
          <Row className="my-5">
            {blogs.length > 0 &&
              blogs.map((blog) => (
                <Blog key={blog._id} {...blog} user={currentUser} />
              ))}
          </Row>
        </Container>
      </main>
    </>
  );
}

export default HomeScreen;
