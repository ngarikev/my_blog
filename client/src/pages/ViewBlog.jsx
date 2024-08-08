import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TimeAgo from "react-timeago";

function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blogs/view/${id}`);
        setBlogs(response.data);
      } catch (error) {}
    };
    fetchBlog();
  }, [id]);
  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
    <>
   <Container className="d-flex flex-column align-items-center m-5">
      <h1 className="text-center">{blog.title}</h1>
      <img
        className="img-fluid my-4"
        src={`data:image/jpeg;base64,${blog.image}`}
        alt={blog.title}
        style={{ maxWidth: "600px", width: "100%" }}
      />
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        className="text-center"
      />
      <p>
        <small>
          <TimeAgo date={new Date(blog.createdAt)} />
        </small>
      </p>
    </Container>
  </>
  )
  
}

export default ViewBlog;
