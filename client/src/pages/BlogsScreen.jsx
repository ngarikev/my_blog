import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { Container, Row } from "react-bootstrap";

function HomeScreen() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, []);
  return (
    <>
      <Container>
        <Row className="my-5">
          {blogs.length > 0 &&
            blogs.map((blog) => <Blog key={blog._id} {...blog} />)}
        </Row>
      </Container>
    </>
  );
}

export default HomeScreen;
