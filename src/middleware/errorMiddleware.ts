import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';
import { ZodError } from 'zod';
import { CRUDError } from '../types/errors';
import { MongoError } from 'mongodb';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    logger.error(err); // Logging the validation errors
    const pathes = err.issues.map((issue) => issue.path.join(', ')).join(', ');
    res.status(422).json({
      title: err.name,
      detail: `Validation error in the ${err.issues.length} following fields: ${pathes}`,
      errors: err.issues,
    });
    return;
  };
  if (err instanceof CRUDError) {
    logger.error(err);
    res.status(400).json({
      title: err.name,
      detail: err.message,
    });
    return;
  };
  if (err instanceof MongoError) {
    logger.error(err);
    res.status(400).json({
      title: err.name,
      detail: err.message,
      code: err.code,
    });
    return;
  };

  logger.error(err); // Logging other errors
  res.status(500).json({
    name: err.name || 'Internal Server Error',
    detail: err.message || 'Internal Server Error'
  });
}