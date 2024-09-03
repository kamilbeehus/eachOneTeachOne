import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to allow cross-origin requests
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from the client,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Use the imported routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Middleware to handle errors
app.use(errorHandler);

export default app;
