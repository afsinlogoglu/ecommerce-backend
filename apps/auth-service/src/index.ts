import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_, res) => res.json({ 
  status: 'OK', 
  service: 'auth-service',
  timestamp: new Date().toISOString()
}));

// API routes
app.use("/api/auth", authRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[auth-service] is running on port ${PORT}`);
});
