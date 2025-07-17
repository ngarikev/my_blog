import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Blog from "../components/Blog";
import axios from "axios";
import Header from "../components/Header";

const baseURL = import.meta.env.VITE_API_URL;

function OtherBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(()=>{
    const fetchOtherBlog = async () => {
      try {
        const response = await axios.get(`${baseURL}/others`);
        setBlogs(response.data)
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchOtherBlog();
  }, [])
  return (
    <>
    <Header />
      <Container>
        <Row className="my-5">
          {blogs.length > 0 &&
            blogs.map((blog) => <Blog key={blog._id} {...blog} />)}
        </Row>
      </Container>
    </>
  );
}

export default OtherBlogs;
