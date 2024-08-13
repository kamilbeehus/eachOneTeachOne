import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Use the imported routes
app.use('/', routes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});
