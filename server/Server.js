const express = require('express');
require('dotenv').config();
const { connectDb, blogPost } = require('./models/blogsDb');
const cors = require('cors');
const multer = require('multer')

const app = express();

connectDb();

app.use(cors({
  origin: 'http://localhost:5173', // Adjust to match your frontend URL
}));


app.use(express.json());
app.use(express.urlencoded({extended: true}))


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

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
})




