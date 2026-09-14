const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${config.mongoUri}. Message: ${error.message}`);
    console.warn(`[Database Note] Please ensure MongoDB service is running locally, or configure MONGODB_URI in server/.env with MongoDB Atlas connection string.`);
    return null;
  }
};

module.exports = connectDB;
