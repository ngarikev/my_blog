import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function BlogsTable() {
  const [blogs, setBlogs] = useState([]);
  const [filterBlogs, setFilterBlogs] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/blogs",
          { withCredentials: true }
        );
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const blogData = blogs.filter(
    (Data) =>
      Data.category.toLowerCase().includes(filterBlogs.toLocaleLowerCase()) ||
      Data.title.toLowerCase().includes(filterBlogs.toLocaleLowerCase())
  );

  // Function to remove HTML tags
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  
  const handleEdit = (id) => {
    navigate(`/dashboard/blogs/edit-blog/${id}`)
  }

  const handleDelete = async(id) => {
    const deleteBlog = window.confirm("Are you sure you want to delete this blog")

    if( deleteBlog ) {
      try {
        const response = await axios.delete(`http://localhost:5000/dashboard/blogs/${id}`, { withCredentials: true })
        if (response.status ===200) {
          alert(response.data.message)
          setBlogs(blogs.filter((blog) => blog._id !== id))
        } else {
          alert("Failed to delete this blog")
        }
      } catch (error) {
        console.log(error)
        alert("Failed")
      }
    }
  }

  const columns = [
    {
      name: "id",
      selector: (row) => row._id,
    },
    {
      name: "image",
      selector: (row) => row.image,
      cell: (row) => (
        <img
          src={`data:image/png;base64,${row.image}`} // Adjust MIME type if necessary
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      name: "Title",
      selector: (row) =>
        row.title.substring(0, 15) + (row.title.length > 15 ? "..." : ""),
    },
    {
      name: "Text",
      selector: (row) => {
        const textContent = stripHtml(row.content);
        return (
          textContent.substring(0, 30) + (textContent.length > 30 ? "..." : "")
        );
      },
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Date Created",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },

    {
      name: "",
      cell: (row) => (
        <div>
          <Button onClick={() =>handleEdit(row._id)} className=" btn-edit btn-sm">
            <FaEdit />
          </Button>
          <Button onClick={() =>handleDelete(row._id)} className=" btn-delete btn-sm" style={{ marginLeft: "10px" }}>
            <CiTrash />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowoverflow: true,
      Button: true,
    },
  ];

  return (
    <div className="text-dark container my-3">
      <div className="d-flex justify-content-between align-items-center mb-3 me-2">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={filterBlogs}
          onChange={(e) => setFilterBlogs(e.target.value)}
        />
      </div>
      <DataTable
        title="Blogs"
        columns={columns}
        data={blogData}
        pagination
        paginationPerPage={6}
        fixedHeader
        striped
        highlightOnHover
      />
    </div>
  );
}

export default BlogsTable;
