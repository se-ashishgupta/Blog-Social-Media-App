import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

config({
  path: "./config/config.env",
});

const app = express();

//Using MiddleWare
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionSuccessStatus: 200,
  })
);

//Importing & Using Routes
import user from "./routes/userRoutes.js";
import blog from "./routes/blogRoutes.js";

app.use("/api/v1", user);
app.use("/api/v1", blog);

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);
