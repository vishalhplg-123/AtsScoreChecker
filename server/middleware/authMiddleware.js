const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Please log in.',
    });
  }

  // 1. Handle Demo / Offline Tokens gracefully
  if (token.startsWith('demo_') || token.startsWith('demo-') || token === 'demo_jwt_token_vishal') {
    try {
      const demoUser = await User.findOne({ email: 'vishal@example.com' }).maxTimeMS(2000);
      if (demoUser) {
        req.user = demoUser;
        return next();
      }
    } catch (e) {}

    req.user = {
      _id: 'demo-vishal-101',
      name: 'Vishal Kumar',
      email: 'vishal@example.com',
      targetRole: 'Senior Full Stack Developer',
    };
    return next();
  }

  // 2. Standard JWT verification
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // If it's a demo session inside decoded payload
    if (decoded.id && decoded.id.toString().startsWith('demo-')) {
      try {
        const demoUser = await User.findOne({ email: 'vishal@example.com' }).maxTimeMS(2000);
        if (demoUser) {
          req.user = demoUser;
          return next();
        }
      } catch (e) {}

      req.user = {
        _id: decoded.id,
        name: 'Vishal Kumar',
        email: 'vishal@example.com',
        targetRole: 'Senior Full Stack Developer',
      };
      return next();
    }

    let user = null;
    try {
      user = await User.findById(decoded.id).maxTimeMS(4000);
    } catch (dbErr) {
      // Fallback demo user if DB buffering timed out
      user = {
        _id: decoded.id,
        name: 'Vishal Kumar',
        email: 'vishal@example.com',
        targetRole: 'Senior Full Stack Developer',
      };
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session has expired or token is invalid. Please log in again.',
    });
  }

};

module.exports = { protect };

