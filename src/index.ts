import app from './app.js';
import { connectToDatabase } from './db/connection.js';

const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log("Server is running and connected to DB"));
}).catch((error) => console.log(error));