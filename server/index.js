import 'dotenv/config';
import app from './src/App.js';
import {connectDB} from './src/db.js';


const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });

