import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Loader from "../components/Loader";

function HomeScreen() {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUser = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/users");
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
              currentUser &&
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
