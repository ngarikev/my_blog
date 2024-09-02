const mongoose = require("mongoose");
const { Schema } = mongoose;
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
  comments: [
    {
      type: String,
      created: {type: Date, default: Date.now},
      postedBy: {type: Schema.Types.ObjectId, ref: "User"}
    }
  ],
 
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
