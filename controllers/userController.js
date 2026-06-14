const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token

const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, 
        {
            expiresIn: process.env.JWT_EXPIRE
        });
    };

// Register User
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check if email exists
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "User not found"
            });

        }

        // Compare passwords
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {

            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });

        }

        // Generate JWT Token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerUser, 
    loginUser
};