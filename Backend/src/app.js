import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";    
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan"

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent
  methods:["GET","POST","PUT","DELETE"],
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))


app.use("/api/auth", authRoutes);


export default app;