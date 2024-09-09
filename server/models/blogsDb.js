const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

const URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Database failed to connect", error);
  }
};

///blog schema

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Store ObjectId, referencing User
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new Schema({
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
  postedBy: {
    type: Schema.Types.ObjectId, 
    ref: "User",
  },
 
  likes:[
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  comments: [commentSchema],
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogPost = mongoose.model("blogPost", blogSchema);


///User schema
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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

const User = mongoose.model("User", userSchema)

module.exports = { 
  connectDb, 
  blogPost,
  User
 };
