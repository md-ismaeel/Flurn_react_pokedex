import express from "express";
import { forgetPassword, userLogOut, userLogin, userRegistration } from "../Controller/userController.js";
import authentication from "../Middleware/userAuthentication.js";
import confirmationEmail from "../Middleware/emailConfirmation.js";
import resetPassword from "../Middleware/resetPassword.js";
const router = express.Router()

router.post("/sign-up", userRegistration);
router.get("/confirmEmail/:token", confirmationEmail);
router.post("/sign-in", userLogin);
router.get("/logout", authentication, userLogOut)
router.post("/resetPassword", forgetPassword)
router.post("/resetPassword/:token", resetPassword)

export default router;