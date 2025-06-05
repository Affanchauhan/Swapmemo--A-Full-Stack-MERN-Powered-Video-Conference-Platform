import express from "express";
import { createServer } from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/v1/users", userRoutes);
const start = async () => {
  try {
    const DBURL = process.env.DBURL;
    if (!DBURL) throw new Error("DBURL not set in .env file");

    await mongoose.connect(DBURL);
    console.log("MongoDB connected");

    server.listen(app.get("port"), () => {
      console.log(`LISTENING ON PORT ${app.get("port")}`);
    });
  } catch (err) {
    console.error("Error starting server:", err.message);
  }
};

start();
