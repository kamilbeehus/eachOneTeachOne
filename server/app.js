import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());

// This code has been commented for development purposes. Uncomment the code to enable cookie parsing.

// Middleware to parse cookies
// app.use(cookieParser());

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
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Middleware to handle errors
app.use(errorHandler);

export default app;
