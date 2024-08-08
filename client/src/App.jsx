import Header from "./components/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BlogsSreen from "./pages/BlogsScreen"
import TechBlogs from "./pages/TechBlogs"
import CreateBlog from "./pages/CreateBlog"
import OtherBlogs from "./pages/OtherBlogs"
import ViewBlog from "./pages/ViewBlog"


function App() {
  

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={ <BlogsSreen />} />
          <Route path="/tech" element={ <TechBlogs />} />
          <Route path="/others" element={ <OtherBlogs />} />
          <Route path="/create-blog" element={ <CreateBlog />} />
          <Route path="/view/:id" element={ <ViewBlog />} />
        </Routes>
      </Router>
       
        
    </>
  )
}

export default App
