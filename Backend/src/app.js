import express from "express";
import cors from "cors";    
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { authUser } from "./middlewares/auth.middleware.js";
import chatRoutes from './routes/chat.routes.js';

const app = express();

try {
  // Middleware
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/chats", authUser, chatRoutes);

} catch (error) {
  console.error("Middleware/Route Setup Error:", error.message);
}

export default app;