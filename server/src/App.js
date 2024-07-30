import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";


const URL = process.env.FRONTEND_URL
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

app.get('/', (req, res) => {
  res.status(200).send('SPA-Tasks API');
});

export default app;

