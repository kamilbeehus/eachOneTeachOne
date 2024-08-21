import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from the client,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Use the imported routes
app.use("/", routes);
app.use("/api/auth", authRoutes);

export default app;
