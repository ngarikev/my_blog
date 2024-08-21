import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { CSVLink } from "react-csv";
import { FaPrint, FaFileCsv } from "react-icons/fa";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState('')

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

  const userDetails = users.filter((detail) =>
    detail.username.toLowerCase().includes(filterUsers.toLowerCase()) || 
    detail.email.toLowerCase().includes(filterUsers.toLowerCase()) ||
    detail.role.toLowerCase().includes(filterUsers.toLowerCase())
  )

  const handlePrint = () => {
    window.print();
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
          <Button className=" btn-edit btn-sm">
            <FaEdit />
          </Button>
          <Button className=" btn-delete btn-sm" style={{ marginLeft: "10px" }}>
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
    <div className="text-dark container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3 me-2">
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
          fixedHeader
          striped
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default UsersTable;
