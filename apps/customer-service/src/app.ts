import express from "express";
import customerRoutes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/api/customer", router);
app.use(errorHandler); // opsiyonel global hata yakalayıcı

export default app;
