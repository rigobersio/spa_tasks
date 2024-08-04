import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";


const URL = process.env.FRONTEND_URL
const app = express();
app.use(cors({
  origin: URL,
  credentials: true,
  //methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
}));



app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);


// Ruta catch-all para servir "index.html"(front) en cualquier otra ruta no gestionada por el backend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/', (req, res) => {
  res.status(200).send('SPA-Tasks API');
});

export default app;

