import expressWinston from 'express-winston';
import logger from './logger';

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
});

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
});
