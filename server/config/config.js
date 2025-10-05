import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Log loaded environment variables (for debugging)
console.log('Loading environment variables from:', path.resolve(process.cwd(), '.env'));
console.log('Environment variables:', {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? '***' : 'Not set',
    GROQ_API_KEY: process.env.GROQ_API_KEY ? '***' : 'Not set',
    MONGO_URI: process.env.MONGO_URI ? '***' : 'Not set',
    JWT_SECRET: process.env.JWT_SECRET ? '***' : 'Not set'
});

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.error('Please check your .env file in the server root directory');
    process.exit(1);
}

// Export config object
export default {
    port: parseInt(process.env.PORT, 10) || 8000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    geminiApiKey: process.env.GEMINI_API_KEY,
    groqApiKey: process.env.GROQ_API_KEY,
    nodeEnv: process.env.NODE_ENV || 'development',
};
