import express from "express";
import {
  Login,
  Signup,
  Logout,
  VerifyOTP,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/verifyotp", VerifyOTP);

export default router;
