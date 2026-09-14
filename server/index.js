const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const config = require('./config/config');
const { errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const jobRoutes = require('./routes/jobRoutes');
const coverLetterRoutes = require('./routes/coverLetterRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Initialize express app
const app = express();

// Connect Database
connectDB();

// Security Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration (Production Ready)
const rawOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
].filter(Boolean);

// Split comma-separated URLs and normalize by removing trailing slashes
const allowedOrigins = [];
rawOrigins.forEach((entry) => {
  entry.split(',').forEach((url) => {
    const clean = url.trim().replace(/\/+$/, '');
    if (clean && !allowedOrigins.includes(clean)) {
      allowedOrigins.push(clean);
    }
  });
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.trim().replace(/\/+$/, '');

      // Check if wildcard, matching origin, or vercel/render preview deployments
      const isAllowed =
        config.clientUrl === '*' ||
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith('.vercel.app') ||
        cleanOrigin.endsWith('.onrender.com') ||
        config.nodeEnv === 'development';

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`[CORS Blocked] Origin not allowed: ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // limit each IP to 2000 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => config.nodeEnv === 'development' || req.ip === '127.0.0.1' || req.ip === '::1',
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});
app.use(generalLimiter);

// AI-specific rate limiter
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120,
  skip: (req) => config.nodeEnv === 'development' || req.ip === '127.0.0.1' || req.ip === '::1',
  message: {
    success: false,
    message: 'AI request limit reached. Please wait a moment before trying again.',
  },
});
app.use('/api/ai', aiLimiter);
app.use('/ai', aiLimiter);


// Health Check API (Standardized for Render / Uptime Monitoring)
const healthHandler = (req, res) => {
  const isDbConnected = require('mongoose').connection.readyState === 1;
  res.status(200).json({
    success: true,
    message: 'API is running',
    status: 'healthy',
    database: isDbConnected ? 'connected' : 'disconnected',
    product: 'ResumeAI Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    openaiConfigured: Boolean(config.openaiApiKey),
  });
};

app.get('/', healthHandler);
app.get('/api/health', healthHandler);
app.get('/health', healthHandler);


// Mount Routes (Supports both /api/* and root /* for bulletproof deployments)
const routePairs = [
  ['/auth', authRoutes],
  ['/resumes', resumeRoutes],
  ['/ai', aiRoutes],
  ['/jobs', jobRoutes],
  ['/cover-letters', coverLetterRoutes],
  ['/upload', uploadRoutes],
];

routePairs.forEach(([path, router]) => {
  app.use(`/api${path}`, router);
  app.use(path, router);
});


// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`,
  });
});

// Central Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || config.port || 5000;

let server = null;
if (require.main === module) {
  // Listen on 0.0.0.0 for cloud providers like Render / Railway
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(`🚀 ResumeAI Backend running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🛠️  Environment: ${config.nodeEnv}`);
    console.log(`=========================================`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Error]: ${err.message}`);
});

module.exports = app;
