import User from "../user/user.model.js";
import bcrypt from "bcryptjs";
import { createTokenAndSaveCookie } from "../jwt/generateToken.js";
import { sendMail } from "../verification/mailer.js";
import { generateOTP } from "../helper/generateOtp.js";

const Signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already registered" });
    }

    const otp = generateOTP();
    const otpExpire = Date.now() + 60000;

    req.session.tempUser = { fullName, email, password, otp, otpExpire };

    const htmlContent = `
    <p>Your OTP is <b>${otp}</b> and expires within 1 minute.</p>
  `;

    await sendMail(email, "Your OTP Code", htmlContent);

    res.status(200).json({
      message: "OTP sent to your email. Please verify to complete the signup.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const ismatch = await bcrypt.compare(password, user.password);
    if (!user || !ismatch) {
      return res.status(400).json({ error: "invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(200).json({
      message: "logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logout Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const VerifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const tempUser = req.session.tempUser;
    if (!tempUser) {
      return res.status(400).json({ error: "No OTP session found" });
    }
    if (
      tempUser.email.toLowerCase() !== email.toLowerCase() ||
      tempUser.otpExpire < Date.now() ||
      tempUser.otp !== otp
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const hashPassword = await bcrypt.hash(tempUser.password, 10);
    const newUser = new User({
      fullName: tempUser.fullName,
      email: tempUser.email,
      password: hashPassword,
    });
    await newUser.save();

    req.session.tempUser = null;
    createTokenAndSaveCookie(newUser._id, res);
    res.status(201).json({
      message: "Signup completed successfully. You are now signed in.",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { Signup, Login, Logout, VerifyOTP };
