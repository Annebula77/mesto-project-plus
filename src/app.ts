import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import 'dotenv/config';
import router from './routes';
import { errorLogger, requestLogger } from './logger/expressLogger';
import ErrorHub from './errors/errorHub';
import user from './models/user';
import card from './models/card';

const app = express();
const { MESTO_MONGOD, PORT } = process.env;
app.use(requestLogger);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(ErrorHub);

const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MESTO_MONGOD as string);
  // Инициализируем индексы для модели
  await user.init();
  await card.init();

  // eslint-disable-next-line no-console
  console.log('Подключились к базе');

  // eslint-disable-next-line no-console
  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log('Сервер запущен на порту:', PORT);
};

connect();
