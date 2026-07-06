require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");

const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
// Middleware to parse JSON data
app.use(express.json());

// Tell the app to use auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
