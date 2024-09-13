import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const BlogsScreen = lazy(() => import("./pages/BlogsScreen"));
const TechBlogs = lazy(() => import("./pages/TechBlogs"))
const OtherBlogs = lazy(() => import("./pages/OtherBlogs"))
const ViewBlog = lazy(() => import("./pages/ViewBlog"))
const Register = lazy(() => import("./pages/Register"))
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./components/Dashboard"))
const DashboardContent = lazy(() => import("./components/DashboardContent"))
const CreateBlog = lazy(() => import("./pages/CreateBlog"))
const UsersTable = lazy(() => import("./components/UsersTable"))
const BlogsTable = lazy(() => import("./components/BlogsTable"))
const AddUser = lazy(() => import("./components/AddUser"))
const EditBlog = lazy(() => import("./components/EditBlog"))
const UpdateUser = lazy(() => import("./components/UpdateUser"))



import Loader from "./components/Loader";

function App() {
  const dashboardCards = [
    {
      title: "Blogs",
      bgColor: "bg-warning",
      link: "blogs",
    },
    {
      title: "Users",
      bgColor: "bg-info",
      link: "users",
    },
    {
      title: "Create Blog",
      bgColor: "bg-success",
      link: "create-blog",
    },
    {
      title: "Add User",
      bgColor: "bg-secondary",
      link: "add-user",
    },
  ];
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<BlogsScreen />} />
            <Route path="/tech" element={<TechBlogs />} />
            <Route path="/others" element={<OtherBlogs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route
                index
                element={<DashboardContent cards={dashboardCards} />}
              />
              <Route path="create-blog" element={<CreateBlog />} />
              <Route path="users" element={<UsersTable />} />
              <Route path="blogs" element={<BlogsTable />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="users/update-user/:id" element={<UpdateUser />} />
              <Route path="blogs/edit-blog/:id" element={<EditBlog />} />
            </Route>

            <Route path="/view/:id" element={<ViewBlog />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
