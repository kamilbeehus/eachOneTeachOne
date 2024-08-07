import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from './db/connection.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Use the imported routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});
