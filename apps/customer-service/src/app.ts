import express from "express";
import cors from "cors";
import helmet from "helmet";
import customerRoutes from "./routes/customer.routes";
import { errorHandler } from "./middlewares/errorHandler";

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
  service: 'customer-service',
  timestamp: new Date().toISOString()
}));

// API routes
app.use("/api/customers", customerRoutes);

// Global error handler
app.use(errorHandler);

export default app;
