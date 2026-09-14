const config = require('../config/config');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Always log server-side error for diagnostics in Render/production logs
  console.error(`[Server Error] ${req.method} ${req.originalUrl}:`, err.message || err);


  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    return res.status(404).json({ success: false, message });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `A record with this ${field} already exists.`;
    return res.status(400).json({ success: false, message });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    return res.status(400).json({ success: false, message });
  }

  // Multer file limit error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size too large. Maximum allowed size is 5MB.',
    });
  }

  const statusCode = error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode || 500);
  const message =
    config.nodeEnv === 'production' && statusCode === 500
      ? 'Internal server error. Please try again later.'
      : error.message || 'Internal Server Error. Please try again later.';

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { errorHandler };
