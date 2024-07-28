import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";


const URL = "https://spa-tasks.vercel.app/" //process.env.FRONTEND_URL // "https://spa-tasks.vercel.app/"
const app = express();
app.use(cors({
  origin: URL,
  credentials: true,
}));



app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;

