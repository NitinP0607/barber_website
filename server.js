const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./configue/db");

dotenv.config();
connectDB(); 

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});