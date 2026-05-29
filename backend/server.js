const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const adminRoutes = require('./routes/blog');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin',adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected 🫦'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));