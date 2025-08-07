import express from 'express';
import authRoutes from "./routes/auth.route";


const app = express();
app.use(express.json());

app.get('/health', (_, res) => res.send('User service is running 🚀'));
app.use("/api/auth", authRoutes);

app.listen(3001, () => {
  console.log('User service listening on port 3001');
});
