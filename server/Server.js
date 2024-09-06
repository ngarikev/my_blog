const express = require("express");
require("dotenv").config();
const { connectDb, blogPost, User } = require("./models/blogsDb");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");

const app = express();

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to match your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hey there am learning nodejs");
});

/////////creates a new blog
app.post("/create-blog", upload.single("image"), async (req, res) => {
  console.log("Request received to /create-blog");

  const { title, category, content } = req.body;
  const image = req.file;

  if (!image) {
    throw new Error("Image file is missing");
  }

  const imageBase64 = image.buffer.toString("base64");
  const BlogData = { title, category, content, image: imageBase64 };

  const newBlog = new blogPost(BlogData);

  try {
    await newBlog.save();
    res.status(200).send("ok");
  } catch (error) {
    res.status(404).send(error);
  }
});

///////get all blogs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogPost.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs", details: error });
  }
});

/////// get blog under category
app.get("/blogs/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const blogs = await blogPost.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
});

////////gets blog by id

app.get("/blogs/view/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
});

////////gets dashboard blogs
app.get("/dashboard/blogs", async (req, res) => {
  try {
    const blogs = await blogPost
      .find({}, "_id title category content createdAt image ")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
});

////////gets dashboard blog

app.get("/dashboard/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogPost.findById(id, "title category content image");
    if (!blog) {
      return res.status(404).json("Blog not found");
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    // res.status(500).json({message: 'Error', error})
  }
});
////////gets dashboard users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
})
////////gets dashboard users
app.get("/dashboard/users", async (req, res) => {
  try {
    const users = await User.find({}, "username email createdAt role").sort({
      createdAt: -1,
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});
////////gets user
app.get("/dashboard/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "username email role");
    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ Error: "Failed to fetch user", error });
  }
});

////////update blog
app.put(
  "/dashboard/blogs/edit-blog/:id",upload.single("image"),async (req, res) => {
    const { id } = req.params;
    const { title, category, content } = req.body;

    // const imageBase64 = image.buffer.toString("base64");
    const BlogData = { title, category, content };
     if ( req.file ) {
      BlogData.image = req.file.buffer.toString("base64");
     }

    try {
      const updateBlog = await blogPost.findByIdAndUpdate(id, BlogData, {
        new: true,
        runValidators: true,
      });
      if (!updateBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json({ Update: "Blog updated successfully", updateBlog });
    } catch (error) {
      res.status(500).json({ Update: "Blog failed to update", error });
    }
  }
);

////////update user
app.put("/dashboard/users/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true, runValidators: true }
    );
    if (!updateUser) {
      return res.status(404).json({ Error: "User not found" });
    }
    res.status(200).json({ Message: "User updatd", updateUser });
  } catch (error) {
    res.status(500).json(error);
  }
});
////////delete blog
app.delete('/dashboard/blogs/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogPost.findByIdAndDelete(id);
    if ( !blog) {
      return res.status(404).json({ Warning: 'Blog not found'})
    }
    res.status(200).json({message: 'Successfully deleted blog'})
  } catch (error) {
    res.status(500).json({ Error: 'Failed to delete blog', Error: error.message})
  }
})

////////delete user
app.delete("/dashboard/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete user", details: error.message });
  }
});

////////register new user

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user with this email already exist" });
  }

  const hashedpassword = await bcrypt.hash(password, 12);

  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    return res.json({ message: "user registered successfully" });
  } catch (error) {
    return res.json(error);
  }
});

/////login authentication

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({ message: "Invalid password" });
  }

  const token = jwt.sign({ _id: user._id, username: user.username }, process.env.TOKEN_KEY, { expiresIn: "1h" });

  console.log("Generated Token:", token);
  res.cookie("token", token, { maxAge: 360000, httpOnly: true });
  return res.json({ status: true, message: "Successfully loged in" });
});

/////logout authentication
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Successfully logedout!" });
});

//authentication Middleware
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded; // Ensure this contains the user ID (_id)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// Like or unlike a blog
app.put(`/blogs/like/:id`, authenticateUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  console.log("User ID:", userId); // Add this to debug

  try {
    const blog = await blogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ Msg: "Blog not found" });
    }
    const liked = blog.likes.includes(userId);
    if (liked) {
      blog.likes = blog.likes.filter(like => like.toString() !== userId.toString());
    } else {
      blog.likes.push(userId);
    }
    await blog.save();
    res.status(200).json({ Msg: "Success", likes: blog.likes.length, liked: !liked });
  } catch (error) {
    res.status(500).json({ Error: "Error liking/unliking the blog", error: error.message });
  }
});

// Comment on a blog
app.post('/blogs/view/comment/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user._id;
  console.log("User ID:", userId); // Add this to debug
  console.log("Comment Text:", text);

  try {
    const blog = await blogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ Msg: "Blog not found" });
    }
    const newComment = { text, postedBy: userId };

    blog.comments.push(newComment);

    console.log("New Comment:", newComment);

    await blog.save();

    res.status(200).json({ Msg: "Comment added", blog });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ Error: "Error adding blog", error: error.message });
  }
});


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
