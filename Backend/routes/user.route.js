import express from "express";
import {
  Login,
  Signup,
  Logout,
  VerifyOTP,
  Reset,
  resetPassword,
  verifyForTest,
  allUsers,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/verifyotp", VerifyOTP);
router.post("/reset", Reset);
router.post("/verifyfortest", verifyForTest);
router.post("/resetPassword", resetPassword);
router.get("/allusers", secureRoute, allUsers);

export default router;
