import dotenv from 'dotenv';
dotenv.config();

console.log("URI:", process.env.MONGODB_URI);

import connectDB from './config/db.js';
import app from './app.js';

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});