import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import session from "express-session";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

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
    genid: (req) => uuidv4(),
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
