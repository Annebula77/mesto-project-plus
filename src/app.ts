import express from 'express';
import mongoose from 'mongoose';
import path from "path";
import "dotenv/config";


const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})

