import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import session from "express-session";

const app = express();

dotenv.config();
app.use(express.json());

const port = 3000;
const uri = process.env.MONOGODB_URI;

try {
  mongoose.connect(uri);
  console.log("Connect to mongodb");
} catch (error) {
  console.log(error);
}

app.use(
  session({
    secret: process.env.SESSION_SCRETE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

app.use("/user", userRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
