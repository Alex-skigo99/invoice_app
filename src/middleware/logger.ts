import winston from 'winston';
import expressWinston from 'express-winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// General Winston logger configuration
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(({ level, message, timestamp, meta, stack }) => {
            return `${timestamp} [${level}]: message ${message} ${stack ? stack : ''}`;
          })
    ),
    transports: [
        new DailyRotateFile({ 
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.printf(({ level, message, timestamp, meta }) => {
                  return `${timestamp} [${level}]: ${message} ${meta? JSON.stringify(meta) : ''}`;
                })
              )
         }),
        new DailyRotateFile({ 
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
        })
    ],
  });
  
  // Create express-winston for HTTP request logging
   export const expressWinstonLogger = expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  });
      