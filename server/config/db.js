const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || config.mongoUri;
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`[Database Error] MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database Warning] MongoDB disconnected. Attempting to reconnect...');
    });

    return conn;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${uri}. Message: ${error.message}`);
    console.warn(`[Database Note] Please configure MONGODB_URI in your environment with a valid MongoDB Atlas connection string.`);
    return null;
  }
};

module.exports = connectDB;

