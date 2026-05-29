const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { auth, isAdmin } = require('../middleware/auth');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// ==========================================
// PUBLIC & USER ROUTES
// ==========================================

// 1. HOMEPAGE - Get All Blogs - Public 
router.get('/', async (req, res) => {
  try {

    const blogs = await Blog.find().populate('userId', 'name profilePic').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.log('Homepage Error:', error.message)
    res.status(500).json({ message: error.message });
  }
});

// 2. MY BLOGS - Get User's Blogs - Private ✅ FIXED FIELD NAME
router.get('/myblogs', auth, async (req, res) => {
  try {
    // ❌ പഴയത്: { author: req.user._id } - Model-ൽ author ഇല്ല
    // ✅ പുതിയത്: userId ആക്കി
    const blogs = await Blog.find({ userId: req.user._id }).populate('userId', 'name profilePic');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. SINGLE BLOG - Get One Blog - Public ✅ FIXED POPULATE
router.get('/:id', async (req, res) => {
  try {
    // ❌ പഴയത്: .populate('author', 'name')
    // ✅ പുതിയത്: userId ആക്കി
    const blog = await Blog.findById(req.params.id).populate('userId', 'name profilePic');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. CREATE BLOG - Private ✅ FIXED FIELD NAME
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const imageName = req.file ? req.file.filename : null;

    const blog = new Blog({
      title,
      category,
      content,
      image: imageName,
      userId: req.user._id // ❌ പഴയത്: author - ✅ പുതിയത്: userId
    });
    
    await blog.save();
    const populatedBlog = await Blog.findById(blog._id).populate('userId', 'username profilePic')
    res.status(201).json(populatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. UPDATE BLOG - Owner Only ✅ FIXED FIELD NAME
router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    // ❌ പഴയത്: blog.author
    // ✅ പുതിയത്: blog.userId
    if (blog.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId', 'name profilePic');
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 6. DELETE BLOG - Owner Only ✅ FIXED FIELD NAME
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    // ❌ പഴയത്: blog.author
    // ✅ പുതിയത്: blog.userId
    if (blog.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// ADMIN ROUTES 
// ==========================================

// 7. ADMIN - Get All Blogs ✅ FIXED POPULATE
router.get('/admin/blogs', auth, isAdmin, async (req, res) => {
  try {
    // ❌ പഴയത്: .populate('author', 'name email')
    // ✅ പുതിയത്: userId ആക്കി
    const blogs = await Blog.find().populate('userId', 'name email profilePic').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 8. ADMIN - Delete Any Blog
router.delete('/admin/blogs/:id', auth, isAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted by admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 9. ADMIN - Get All Users ✅ ഇത് തന്നെയാണ് Admin panel-ന് വേണ്ടത്
router.get('/admin/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 10. ADMIN - Delete User ✅ FIXED FIELD NAME
router.delete('/admin/users/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // ❌ പഴയത്: { author: req.params.id }
    // ✅ പുതിയത്: { userId: req.params.id }
    await Blog.deleteMany({ userId: req.params.id }); 
    res.json({ message: 'User and their blogs deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;