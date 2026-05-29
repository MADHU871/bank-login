const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");

app.use("/api/auth", authRoutes);
app.use("/api", accountRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Bank Login API Running"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});