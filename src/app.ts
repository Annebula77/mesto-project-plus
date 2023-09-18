import express, { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import path from "path";
import "dotenv/config";
import router from "./routes";
import user from "models/user";


const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: "650847432cf9d626a80b80a4",
  };

  next();
});

app.use(router);

const connect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
  console.log("Подключились к базе");

  await app.listen(PORT);
  console.log("Сервер запущен на порту:", PORT);
};

connect();
