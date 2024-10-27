import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err); // Logging the error
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}