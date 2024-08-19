const express = require('express');
require('dotenv').config();
const { connectDb, blogPost, User } = require('./models/blogsDb');
const cors = require('cors');
const multer = require('multer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieparser = require('cookie-parser')

const app = express();

connectDb();

app.use(cors({
  origin: 'http://localhost:5173', // Adjust to match your frontend URL
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())


const storage = multer.memoryStorage();
const upload = multer({ storage: storage})

app.get('/', (req, res) => {
  res.send('Hey there am learning nodejs')
});

/////////creates a new blog
app.post('/create-blog', upload.single('image'), async (req, res) => {

  console.log('Request received to /create-blog');

  const { title, category, content } = req.body;
  const image = req.file;
  
  if (!image) {
    throw new Error('Image file is missing');
  }

  const imageBase64 = image.buffer.toString('base64')
  const BlogData = { title, category, content, image: imageBase64 };
  
  const newBlog = new blogPost(BlogData);
 

  try {
    await newBlog.save()
    res.status(200).send('ok')
  } catch (error) {
    res.status(404).send(error)
  }
});

///////get all blogs
app.get('/blogs', async(req, res) =>{
  try {
    const blogs = await blogPost.find() .sort( { createdAt: -1 })
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs', details: error });
    
  }
})

/////// get blog under category
app.get('/blogs/:category', async(req, res) =>{

  const { category } = req.params
  try {
    const blogs = await blogPost.find({ category }) .sort({createdAt: -1});
    res.status(200).json(blogs)
  } catch (error) {
    console.log(error);
    
  }
})

////////gets blog by id

app.get('/blogs/view/:id', async(req, res) =>{
  const { id } = req.params

  try {
    const blog = await blogPost.findById(id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog)
  } catch (error) {
    console.log(error);
    
  }
})

////////gets users
app.get('/dashboard/users', async(req,res) =>{
  try {
    const users = await User.find({}, 'username email createdAt role')
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
})
////////register new user

app.post('/register', async(req,res) =>{
  const { username, email, password } = req.body;

  const user = await User.findOne({email});
  if (user) {
    return res.json({message: "user with this email already exist"})
  }

  const hashedpassword = await bcrypt.hash(password, 12);

  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save()
    return res.json({message: "user registered successfully"})
  } catch (error) {
    return res.json(error)
  }

})

/////login authentication

app.post('/login', async(req, res) =>{

  const { email, password } = req.body;
  
  const user = await User.findOne({email})
  if (!user) {
    return res.json({message: "User not registered"})
  }
  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return res.json({message: "Invalid password"})
  }

  const token = jwt.sign({ username: user.username }, process.env.TOKEN_KEY, {expiresIn: '1h'})
  console.log('Generated Token:', token);
  res.cookie('token', token, { maxAge: 360000, httpOnly: true });
  return res.json({status: true, message: 'Successfully loged in'})
  

})

/////logout authentication
app.post('/logout', (req, res) =>{
  res.clearCookie('token')
  return res.json({status: true, message: 'Successfully logedout!'})
})


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
})




