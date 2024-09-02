import React, { useState } from "react";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiClock2 } from "react-icons/ci";
import { SlLike } from "react-icons/sl";
import { GoComment } from "react-icons/go";
import TimeAgo from "react-timeago";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Blog({ _id, title, content, image, createdAt, likes, user, comments }) {

  const [likeCount, setLikeCount] = useState(likes.length);
  const [liked, setLiked] = useState(user ? likes.includes(user._id) : false)

  const truncatedTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;

  const truncatedContent = content.length > 150 ? content.slice(0, 150) + "..." : content;

  const navigate = useNavigate()

  const handleLike = async() => {

    if (!user) {
      navigate('/login')
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/blogs/like/${_id}`, {}, { withCredentials: true });
      setLikeCount(response.data.likes)
      setLiked(response.data.liked)

    } catch (error) {
      console.log("Error liking/unliking the blog", error)
    }
  }

  return (
    <>
      <Col lg={4} md={6} sm={12}>
        <div className="card">
        <Link className="text-decoration-none" to={`/view/${_id}`} >
        <img
            className="img-fluid"
            src={`data:image/jpeg;base64,${image}`}
            alt="title"
          />
        </Link>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mx-auto text-white">
            <time className="ms-auto">
              <CiClock2 />
              <small className="small ms-1">
                <TimeAgo date={new Date(createdAt)} />
              </small>
            </time>
          </div>
          <Link className="text-decoration-none " to={`/view/${_id}`}>
          <h4>{truncatedTitle}</h4>
          </Link>

          <p
            dangerouslySetInnerHTML={{ __html: truncatedContent }}
            className="text-white"
          ></p>
          <div className="d-flex justify-content-between me-3 text-white mb-5">
            <div className="Icons">
              <SlLike onClick={handleLike}
              style={{ color: liked ? "red" : "white"}}
              
              />
              <span> {likeCount}</span>
            </div>
            <div className="Icons">
              <GoComment />
              <span> {comments.length} </span>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}

export default Blog;
