
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BlogsSreen from "./pages/BlogsScreen"
import TechBlogs from "./pages/TechBlogs"
import CreateBlog from "./pages/CreateBlog"
import OtherBlogs from "./pages/OtherBlogs"
import ViewBlog from "./pages/ViewBlog"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./components/Dashboard"


function App() {
  

  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={ <BlogsSreen />} />
          <Route path="/tech" element={ <TechBlogs />} />
          <Route path="/others" element={ <OtherBlogs />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/dashboard" element={ <Dashboard />}/>
          <Route path="/create-blog" element={ <CreateBlog />} />
          <Route path="/view/:id" element={ <ViewBlog />} />
        </Routes>
      </Router>
       
        
    </>
  )
}

export default App
