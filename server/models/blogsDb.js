const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Database failed to connect", error);
  }
};

///blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogPost = mongoose.model("blogPost", blogSchema);

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
  },
  email: { 
    type: String, 
    required: true, 
  },
  password: { 
    type: String, 
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema)

module.exports = { 
  connectDb, 
  blogPost,
  User
 };
