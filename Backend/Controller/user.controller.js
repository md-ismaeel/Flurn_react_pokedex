const userModel = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRETE_KEY;

async function registration(req, res) {
    // console.log(req.body);

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All field required!!",
        });
    }

    try {
        const isRegistered = await userModel.findOne({ email });

        if (isRegistered) {
            return res.status(409).json({
                success: false,
                message: "user already registered!!",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            ...req.body,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "user registered successfully!!",
            results: user._id,
        });
    } catch (err) {
        console.warn("ERROR- during registration" + err);
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
        });
    }
}

async function login(req, res) {
    // console.log(req.body);
    const { userName, email, password } = req.body;

    if ((!userName && !email) || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields required!!",
        });
    }

    try {
        const user = await userModel.findOne({
            $or: [{ email: email }, { userName: userName }]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user Not found!!",
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user!!",
            });
        }

        const payload = {
            userName: user.userName,
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: 7 * 24 * 60 * 60 });
        user.token = `${token}`
        await user.save();

        const miliSecondIn7days = 7 * 24 * 60 * 60 * 1000;
        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: miliSecondIn7days,
        });

        res.status(200).json({
            success: true,
            message: "user logedIn successfully!!",
            token: `Bearer ${token}`,
        });

    } catch (err) {
        console.warn("ERROR during login user" + err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

async function logout(req, res) {
    // console.log("logout-req", req.user);

    await userModel.findByIdAndUpdate(req.user._id, { token: null })

    res.clearCookie("token", {
        secure: true,
        sameSite: "none",
        path: "/"
    })

    res.json({
        success: true,
        message: "User logged out successfully",
    });
}

const userController = {
    registration,
    login,
    logout
};

module.exports = userController;
