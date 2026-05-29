const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, auth denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

const isAdmin = (req, res, next) => {
  console.log('User Role:',req.user.role)
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only!' });
  }
  next();
};

module.exports = {auth ,isAdmin };