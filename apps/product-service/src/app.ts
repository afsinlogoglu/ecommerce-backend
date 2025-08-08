import express from "express";
import cors from "cors";
import helmet from "helmet";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
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
  service: 'product-service',
  timestamp: new Date().toISOString()
}));

// API routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Global error handler
app.use(errorHandler);

export default app; 