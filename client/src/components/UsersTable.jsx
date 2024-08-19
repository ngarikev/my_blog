import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";

function UsersTable() {
  const [users, setUsers] = useState([]);

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
          <Button className=" btn-primary btn-sm">
            <FaEdit />
          </Button>
          <Button className=" btn-danger btn-sm" style={{ marginLeft: "10px" }}>
            <CiTrash />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="text-dark container my-5">
      <DataTable
        title="User Details"
        columns={columns}
        data={users}
        pagination
        fixedHeader
        striped
        highlightOnHover
      />
    </div>
  );
}

export default UsersTable;
