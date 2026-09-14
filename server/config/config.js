const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumeai',
  jwtSecret: process.env.JWT_SECRET || 'super_secret_jwt_key_resumeai_production_grade_2026',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
