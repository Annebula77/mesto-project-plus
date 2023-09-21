import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import 'dotenv/config';
import router from './routes';
import { SERVER_ERROR_MESSAGE, STATUS_SERVER_ERROR } from './utils/consts';

const app = express();
const { PORT } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(router);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // Логирование ошибки(временное решение)
  // eslint-disable-next-line no-console
  console.error(error.message);

  // Отправка ответа пользователю
  res.status(error.statusCode || SERVER_ERROR_MESSAGE).json({
    status: 'error',
    message: error.message || STATUS_SERVER_ERROR,
  });
  next();
});

const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  // (временное решение)
  // eslint-disable-next-line no-console
  console.log('Подключились к базе');

  // (временное решение)
  // eslint-disable-next-line no-console
  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log('Сервер запущен на порту:', PORT);
};

connect();
