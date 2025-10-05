import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Import config first to ensure env vars are loaded
import config from './config/config.js';

// Import routes and controllers
import authRoutes from "./routes/authRoute.js";
import sessionRoute from "./routes/sessionRoute.js";
import questionRoute from "./routes/questionRoute.js";

import { protect } from "./middleware/authMiddleware.js";
import { generateInterviewQuestions, explainConcept } from "./contollers/aiController.js";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting server with configuration:', {
    port: config.port,
    nodeEnv: config.nodeEnv,
    mongoUri: config.mongoUri ? '***' : 'Not configured',
    geminiApiKey: config.geminiApiKey ? '***' : 'Not configured',
    jwtSecret: config.jwtSecret ? '***' : 'Not configured'
});

const app = express();



// CORS Configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8000', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoute);
app.use("/api/questions", questionRoute);

// Health check endpoint for Docker
app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: "1.0.0",
        sponsor: "Meta Llama via Groq API"
    });
});

// Test route
app.get("/api/test", (req, res) => {
    res.json({ 
        success: true, 
        message: "CrackBano API is working",
        powered_by: "Meta Llama 3.1 70B",
    });
});

// AI Routes - Powered by Meta Llama
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/explain-concept", protect, explainConcept);

// API Info endpoint
app.get("/api/info", (req, res) => {
    res.json({
        name: "CrackBano API",
        version: "1.0.0",
        description: "AI-Powered Interview Preparation Platform",
        ai_model: "Meta Llama 3 70B",
        provider: "Groq API",
        sponsor_compliance: {
            meta: "Using Llama 3 70B for question generation and explanations",
            docker: "Containerized with Docker and Docker Compose"
        }
    });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(' Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: config.nodeEnv === 'development' ? err.message : 'Something went wrong!',
        ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
});

// Connect to MongoDB
const connectDB = async () => {
    try {
        console.log('Attempting to connect to database.....');
        await mongoose.connect(config.mongoUri);
        console.log(' Connected to database');
    } catch (error) {
        console.error(' Database connection error:', error.message);
        process.exit(1);
    }
};

// Start server
const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(config.port, () => {
            console.log(`🚀 CrackBano Server is running on port ${config.port}`);
            console.log(`📊 Health Check: http://localhost:${config.port}/health`);
        });
        return server;
    } catch (error) {
        console.error(' Failed to start server:', error.message);
        process.exit(1);
    }
};

// Start the server and handle unhandled rejections
startServer()
    .then(server => {
        console.log(' Server started successfully');
        
        process.on('unhandledRejection', (err) => {
            console.error(' Unhandled Rejection:', err);
            server.close(() => {
                console.log('Server closed due to unhandled rejection');
                process.exit(1);
            });
        });

        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                console.log('Process terminated');
            });
        });
    })
    .catch(error => {
        console.error(' Failed to start server:', error);
        process.exit(1);
    });