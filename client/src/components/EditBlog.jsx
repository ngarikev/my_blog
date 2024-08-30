import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "clean",
];

function EditBlog() {
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/dashboard/blogs/${id}`,
          { withCredentials: true }
        );
        const { title, image, category, content } = response.data;
        setTitle(title);
        setPreviewImage(`data:image/jpeg;base64,${image}`);
        setCategory(category);
        setContent(content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleBlogUpdate = async (e) => {
    e.preventDefault();
    const BlogData = new FormData();
    BlogData.append("title", title);
    BlogData.append("category", category);
    BlogData.append("content", content);

    if (image) {
      BlogData.append("image", image);
    }

    try {
      await axios.put(
        `http://localhost:5000/dashboard/blogs/edit-blog/${id}`,
        BlogData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(BlogData);
      alert("Successfuly updated");
      navigate("/dashboard/blogs");
    } catch (error) {
      console.log(error);
      alert("Failed to update data");
    }
  };
  //  const handleBlogUpdate = async (e) => {
  //   e.preventDefault()
  //  }

  return (
    <>
      <h1 className="text-dark text-center mt-5 display-6">
        Create your blog here!
      </h1>
      <Container className="create_form">
        <Form onSubmit={handleBlogUpdate}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxHeight: "50px", marginBottom: "10px" }}
              />
            )}
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Blog Category</option>
              <option value="tech">Tech</option>
              <option value="others">Others</option>
            </Form.Select>
          </Form.Group>

          <ReactQuill
            ref={quillRef}
            modules={modules}
            formats={formats}
            className="mb-3 bg-white text-body"
            value={content}
            onChange={setContent}
          />

          <Button variant="primary btn" type="submit">
            Update Blog
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditBlog;
