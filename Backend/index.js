import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import session from "express-session";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());


const port = 3000;
const uri = process.env.MONOGODB_URI;

try {
  mongoose.connect(uri);
  console.log("Connect to mongodb");
} catch (error) {
  console.log(error);
}


app.use(session({
  genid: (req) => uuidv4(), 
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use("/user", userRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
