import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { CiClock2 } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import Header from "../components/Header";

function ViewBlog() {
  const { id } = useParams();
  // const navigate = useNavigate();

  const [blog, setBlogs] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([])

  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blogs/view/${id}`
        );
        setBlogs(response.data);
        setComments(response.data.comments);

      } catch (error) {}
    };
    fetchBlog();
  }, [id]);
  if (!blog) {
    return <div>Loading...</div>;
  }

  const submitComment = async (e) =>{
    e.preventDefault();

    if (comment.trim() && user) {
      try {
        const response = await axios.post(`http://localhost:5000/blogs/comment/${id}`, {text: comment}, {withCredentials: true })
        setComments(response.data.comments);
        setComment("")
      } catch (error) {
        console.log("Failed to add comment", error)
      }
    } else {
      console.log("User not logged in")
      // navigate('/login')
    }
  }
  return (
    <>
    <Header />
      <Container className=" m-5">
        <div className="d-flex flex-column align-items-center view-blog py-3 rounded">
          <h1 className="text-center">{blog.title}</h1>
          <img
            className="img-fluid my-4 px-3 "
            src={`data:image/jpeg;base64,${blog.image}`}
            alt={blog.title}
            style={{ maxWidth: "600px", width: "100%" }}
          />
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="text-start lines"
          />
          <time className="ms-auto">
            <CiClock2 />
            <small className="small me-5">
              <TimeAgo date={new Date(blog.createdAt)} />
            </small>
          </time>
        </div>

        <Form
          onSubmit={submitComment}
          className="comment-form mt-3 p-3 rounded"
        >
          <Form.Group className="my-3">
            <h6>Comments:</h6>
            {comments.map((comm, index) => (
              <div key={index}>
                <h6>{comm.postedBy.username}</h6>
                <p className="comment">{comm.text}</p>
              </div>
            ))}

            <Form.Control
              as="textarea"
              cols={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!user}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary btn" type="submit" disabled={!user}>
            Comment
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ViewBlog;
