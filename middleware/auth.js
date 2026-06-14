const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = async (req, res, next) => {

    try {

        

        const token = req.headers.authorization;

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Please login to access this resource"
            });

        }

        // Remove "Bearer "
        const jwtToken = token.split(" ")[1];

        const decoded = jwt.verify(
            jwtToken,
            process.env.JWT_SECRET
        );

        req.user = await User.findById(decoded.id);

        next();

    } catch (error) {
 console.log(error);
        res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

module.exports = isAuthenticatedUser;