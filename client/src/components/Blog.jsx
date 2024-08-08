import React from "react";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiClock2 } from "react-icons/ci";
import { SlLike } from "react-icons/sl";
import { GoComment } from "react-icons/go";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

function Blog({ _id, title, content, image, createdAt }) {
  return (
    <>
      <Col lg={4} md={6} sm={12}>
        <div className="card">
        <Link to={`/view/${_id}`}>
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
          <Link to={`/view/${_id}`}>
          <h4>{title}</h4>
          </Link>

          <p
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-white"
          ></p>
          <div className="d-flex justify-content-between me-3 text-white mb-5">
            <div className="Icons">
              <SlLike />
              <span> 0 </span>
            </div>
            <div className="Icons">
              <GoComment />
              <span> 0 </span>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}

export default Blog;
