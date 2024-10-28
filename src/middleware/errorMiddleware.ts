import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';
import { ZodError } from 'zod';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    logger.error(err); // Logging the validation errors
    res.status(422).json({
      success: false,
      message: 'Data validation error',
      errors: err.issues,
    });
    return;
  };

  logger.error(err); // Logging the error
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}