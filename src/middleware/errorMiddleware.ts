import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';
import { ZodError } from 'zod';
import { title } from 'process';

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

  logger.error(err); // Logging the error
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}