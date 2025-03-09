const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthUtils = require("./utils/authUtils.js");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = `mongodb+srv://${AuthUtils.dbUsername}:${AuthUtils.dbPassword}@cluster0.y14hz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process on failure
    }
}

// Connect to the database
connectDB();

// Middleware to pass DB client to routes
app.use((req, res, next) => {
    req.db = client.db("Mayandi_Database");
    next();
});

// API Routes
app.use("/api", apiRoutes);

// Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
