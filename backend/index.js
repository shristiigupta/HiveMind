require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// CORS middleware configuration
app.use(cors({
  origin: ["https://hivemindsocialapp.netlify.app"],  // Adjust frontend URL if necessary
  credentials: true,                // Allow credentials and cookies
  optionsSuccessStatus: 200,
}));

const corsOptions = {
  origin: "https://hivemindsocialapp.netlify.app",  // Frontend URL
  credentials: true,                // Allow credentials (cookies)
  optionsSuccessStatus: 200,
};



app.use(cors(corsOptions));

// Middleware to handle JSON and cookies
app.use(cookieParser());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoute);  // Authentication routes will now be under /api/auth



// Start server and MongoDB connection
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
