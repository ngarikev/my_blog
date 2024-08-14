import React, { useEffect, useState } from 'react'
import Blog from '../components/Blog';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Header from '../components/Header';

function TechBlogs() {
 const [blogs, setBlogs] = useState([])
  
useEffect(() =>{
  const fetchTechBlog = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs/tech");
      setBlogs(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }
  fetchTechBlog()
}, [])
  return (
    <div>
      <Header />
      <Container >
        <Row className="my-5">
          {blogs.length > 0 &&
            blogs.map((blog) => <Blog key={blog._id} {...blog} />)}
        </Row>
      </Container>
    </div>
  );
}

export default TechBlogs