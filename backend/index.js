import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js";
import authRouter from "./rout/authUser.js";

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Define routes
app.use('/api/auth', authRouter);

// Home route to check server status
app.get("/", (req, res) => {
  res.send("Server working");
});

// Start the server
app.listen(PORT, () => {
  dbConnect();
  console.log(`Server running at http://localhost:${PORT}`);
});
