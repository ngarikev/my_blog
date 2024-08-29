import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { CSVLink } from "react-csv";
import { FaPrint, FaFileCsv, FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/users",
          { withCredentials: true }
        );
        setUsers(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchUsers();
  }, []);

  const userDetails = users.filter(
    (detail) =>
      detail.username.toLowerCase().includes(filterUsers.toLowerCase()) ||
      detail.email.toLowerCase().includes(filterUsers.toLowerCase()) ||
      detail.role.toLowerCase().includes(filterUsers.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  const handleAddUser = () => {
    navigate("/dashboard/add-user");
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/users/update-user/${id}`);
  };

const handleDelete = async (id) => {
  const deleteUser = window.confirm("Are you sure you want to delete this user?");

  if (deleteUser) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/dashboard/users/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert(response.data.message);
        setUsers(users.filter((user) => user._id !== id));
        navigate("/dashboard/users");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  }
};


  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Date Created",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div>
          <Button
            onClick={() => handleEdit(row._id)}
            className=" btn-edit btn-sm"
          >
            <FaEdit />
          </Button>
          <Button
            onClick={() => handleDelete(row._id)}
            className=" btn-delete btn-sm"
            style={{ marginLeft: "10px" }}
          >
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
    <div className="text-dark container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3 me-2">
        <Button onClick={handleAddUser} className="btn btn-secondary me-2">
          Add User
        </Button>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={filterUsers}
          onChange={(e) => setFilterUsers(e.target.value)}
        />
        <div>
          <Button
            onClick={handlePrint}
            className="btn btn-secondary btn-sm me-2"
          >
            <FaPrint /> Print
          </Button>
          <CSVLink
            data={users}
            filename={"user_details.csv"}
            className="btn btn-success btn-sm"
          >
            <FaFileCsv /> Download CSV
          </CSVLink>
        </div>
      </div>
      <div className="printOnly">
        <DataTable
          title="User Details"
          columns={columns}
          data={userDetails}
          pagination
          paginationPerPage={6}
          fixedHeader
          striped
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default UsersTable;
