import 'dotenv/config';
import app from './App.js';
import {connectDB} from './db.js';


const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });

