const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "firstName is required!!"],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validator: [validator.isEmail, "Provide a valid email id!!"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "password is required!!"],
            minLength: [8, "password min-length should be 8 character!!"],
        },
        token: {
            type: String,
            required: false,
            default: null,
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
