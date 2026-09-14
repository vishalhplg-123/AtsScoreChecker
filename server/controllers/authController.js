const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password.',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        targetRole: user.targetRole,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    // If MongoDB is offline or buffering, allow demo credentials immediately
    const isDbConnected = require('mongoose').connection.readyState === 1;

    if (!isDbConnected && (email === 'vishal@example.com' || email.includes('demo'))) {
      const mockId = 'demo-vishal-101';
      const token = generateToken(mockId);
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: mockId,
          name: 'Vishal Kumar',
          email: 'vishal@example.com',
          headline: 'Senior Full Stack & AI Engineer',
          targetRole: 'Senior Full Stack Developer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          preferences: { defaultTemplate: 'modern', theme: 'light' },
        },
      });
    }

    // Check for user
    let user = null;
    try {
      user = await User.findOne({ email }).select('+password').maxTimeMS(4000);
    } catch (dbErr) {
      // If DB timed out and demo credentials were provided
      if (email === 'vishal@example.com' || email.includes('demo')) {
        const mockId = 'demo-vishal-101';
        const token = generateToken(mockId);
        return res.status(200).json({
          success: true,
          token,
          user: {
            id: mockId,
            name: 'Vishal Kumar',
            email: 'vishal@example.com',
            headline: 'Senior Full Stack & AI Engineer',
            targetRole: 'Senior Full Stack Developer',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
            preferences: { defaultTemplate: 'modern', theme: 'light' },
          },
        });
      }
      throw dbErr;
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        targetRole: user.targetRole,
        avatar: user.avatar,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    if (error.message && error.message.includes('buffering timed out')) {
      return res.status(503).json({
        success: false,
        message: 'Database connection timed out. Please ensure 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access.',
      });
    }
    next(error);
  }
};


// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        targetRole: user.targetRole,
        avatar: user.avatar,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, headline, targetRole, avatar, preferences } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (headline) user.headline = headline;
    if (targetRole) user.targetRole = targetRole;
    if (avatar !== undefined) user.avatar = avatar;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        targetRole: user.targetRole,
        avatar: user.avatar,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
};
