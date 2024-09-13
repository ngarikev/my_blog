import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { CiClock2 } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import Header from "../components/Header";
import Loader from "../components/Loader";


function ViewBlog() {
  const { id } = useParams();
  // const navigate = useNavigate();

  const [blog, setBlogs] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blogs/view/${id}`
        );
        setBlogs(response.data);
        setComments(response.data.comments || []);

        // Fetch users to map user IDs to usernames
        const usersResponse = await axios.get('http://localhost:5000/users');
        const usersMap = {};
        usersResponse.data.forEach(user => {
          usersMap[user._id] = user.username;
        });
        setUsers(usersMap);

      } catch (error) {}
    };
    fetchBlog();
  }, [id]);
  if (!blog) {
    return <div>{<Loader />}</div>
  }

  const submitComment = async (e) => {
    e.preventDefault();

    if (comment.trim() && user) {
      try {
        const response = await axios.post(
          `http://localhost:5000/blogs/view/comment/${id}`,
          { text: comment },
          { withCredentials: true }
        );
        setComments([...comments, response.data.blog.comments.pop()]);
        setComment("");
      } catch (error) {
        console.log("Failed to add comment", error);
      }
    } else {
      console.log("User not logged in");
      // navigate('/login')
    }
  };
  return (
    <>
      <Header />
      <Container className="d-flex flex-column align-items-center my-5">
        <div className=" view-blog py-3 rounded">
          <h1 className="text-center">{blog.title}</h1>
          <div className="d-flex justify-content-center my-4">
            <img
              className="img-fluid"
              src={`data:image/jpeg;base64,${blog.image}`}
              alt={blog.title}
              style={{ maxWidth: "600px", width: "100%" }}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="text-start px-5 "
          />
          <time className="ms-auto px-5">
            <CiClock2 />
            <small className="small me-5">
              <TimeAgo date={new Date(blog.createdAt)} />
            </small>
          </time>
        </div>
      </Container>
      <Container>
        <Form
          onSubmit={submitComment}
          className="comment-form mt-3 p-3 rounded"
        >
          <Form.Group className="my-3">
            <h6>Comments:</h6>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <Card className="my-3" key={comment._id}>
                  <Card.Body>
                    <Card.Title className="small">{comment.postedBy ? users[comment.postedBy] : "Unknown"}</Card.Title>
                    <Card.Text>{comment.text}</Card.Text>
                    <Card.Footer className="text-muted">
                      <small className="small">{new Date(comment.createdAt).toLocaleString()}</small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No comments yet</p>
            )}
            {/* {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id}>
                  {comment.postedBy ? (
                    <p className="small">
                      Posted by: {users[comment.postedBy] || "Unknown"} <br></br>
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  ) : (
                    <p>Posted by: Unknown</p>
                  )}
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet</p>
            )} */}
            {/* {comments.map((comm, index) => (
              <div key={index}>
                <h6>{comm.postedBy.username}</h6>
                <p className="comment">{comm.text}</p>
              </div>
            ))} */}

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
