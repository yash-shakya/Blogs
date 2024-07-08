import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/router/routes.js";
import Blog from "./src/model/blog.js";

// Initialize Express app
const app = express();

const blog = new Blog();

// Load environment variables from .env file
const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_HOST;

dotenv.config();

// CORS Config
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://127.0.0.1', // Specify your allowed frontend origins as an environment variable
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};



app.use(session({ secret: 'YOUR_SESSION_SECRET', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies for this app

// Basic route


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection to MongoDB successful");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

// Start server and connect to database
const startServer = async () => {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });

    routes(app);
};

startServer();
