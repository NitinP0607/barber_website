const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./configue/db");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB(); 

const app = express();

//Middleware
app.use(cors());
app.use(express.json());



//Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);


// Serve frontend
app.use(express.static("docs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});