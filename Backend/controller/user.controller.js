import User from "../user/user.model.js";
import bcrypt from "bcryptjs";
import { createTokenAndSaveCookie } from "../jwt/generateToken.js";
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

    const hashPassword = await bcrypt.hash(password, 10);

    const newuser = await new User({
      fullName,
      email,
      password: hashPassword,
    });
    await newuser.save();
    if (newuser) {
      createTokenAndSaveCookie(newuser._id, res);
      res.status(201).json({ message: "User created Successfully", newuser });
    }
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
export { Signup, Login };
