require("dotenv").config();
const userModel = require("../Model/user.model");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRETE_KEY;

const authenticateUser = async (req, res, next) => {
    /*
     * Points to be validated in token
     * 1. Token should be present
     * 2. Secret key validation (This is the same token that we have generated)
     * 3. Token expiry date should not be passed
     * 4. Validate the issued at date (Optional)
     * 5. Validate the user id if it is present in database
     */
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user => Token is required!!",
        });
    }

    let token_data;

    try {
        token_data = jwt.verify(token, secretKey);
    } catch (err) {
        console.warn("Error verifying token =>:", err);
        return res.status(401).json({
            success: false,
            message: "Unauthorized user => Invalid token!!",
        });
    }

    // console.log("token_data", token_data);

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (currentTime > token_data.exp) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user => Token has expired!!",
        });
    }

    try {
        const user = await userModel.findById(token_data.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user => User not found!!",
            });
        }
        req.user = user; // Attach user information to the request object
    } catch (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching user!!",
        });
    }

    next();
};

module.exports = authenticateUser;
