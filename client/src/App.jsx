import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogsSreen from "./pages/BlogsScreen";
import TechBlogs from "./pages/TechBlogs";
import OtherBlogs from "./pages/OtherBlogs";
import ViewBlog from "./pages/ViewBlog";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import DashboardContent from "./components/DashboardContent";
import CreateBlog from "./pages/CreateBlog";
import UsersTable from "./components/UsersTable";
import BlogsTable from "./components/BlogsTable";
import AddUser from "./components/AddUser";
import EditBlog from "./components/EditBlog";
import UpdateUser from "./components/UpdateUser";

function App() {
  const dashboardCards = [
    {
      title: "Blogs",
      bgColor: "bg-warning",
      link: "blogs"
    },
    {
      title: "Users",
      bgColor: "bg-info",
      link: "users"
    },
    {
      title: "Create Blog",
      bgColor: "bg-success",
      link: "create-blog"
    },
    {
      title: "Add User",
      bgColor: "bg-secondary",
      link: "add-user"
    }
    ];
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BlogsSreen />} />
          <Route path="/tech" element={<TechBlogs />} />
          <Route path="/others" element={<OtherBlogs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<DashboardContent cards={dashboardCards} />} />
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="users" element={<UsersTable />} />
            <Route path="blogs" element={<BlogsTable />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="users/update-user/:id" element={<UpdateUser />} />
            <Route path="edit-blog/:id" element={<EditBlog />} />
          </Route>

          <Route path="/view/:id" element={<ViewBlog />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
