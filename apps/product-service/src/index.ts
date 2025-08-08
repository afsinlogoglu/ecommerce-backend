import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`[product-service] is running on port ${PORT}`);
}); 