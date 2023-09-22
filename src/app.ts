import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import expressWinston from 'express-winston';
import logger from './utils/logger';
import 'dotenv/config';
import router from './routes';
import { SERVER_ERROR_MESSAGE, STATUS_SERVER_ERROR } from './utils/consts';
import { ExtendedError } from './utils/types';

const app = express();
const { PORT } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
}));
app.use(express.json());
app.use(router);
app.use(expressWinston.errorLogger({
  winstonInstance: logger,
}));

// eslint-disable-next-line no-unused-vars
app.use((error: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.error(error.message, { stack: error.stack, ...req });
  }
  // Отправка ответа пользователю
  res.status(error.statusCode || STATUS_SERVER_ERROR).json({
    status: 'error',
    message: error.message || SERVER_ERROR_MESSAGE,
  });
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
