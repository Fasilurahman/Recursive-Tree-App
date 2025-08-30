import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';
import { ERRORS, STATUS_CODES } from '../constants/errors';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  // Handle AppError instances
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const messages = Object.values((err as any).errors).map((e: any) => e.message).join(', ');
    res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: `${ERRORS.VALIDATION_ERROR.message}: ${messages}`,
      code: ERRORS.VALIDATION_ERROR.code,
    });
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: ERRORS.INVALID_ID.message,
      code: ERRORS.INVALID_ID.code,
    });
  }

  // Handle MongoDB duplicate key error
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    res.status(STATUS_CODES.CONFLICT).json({
      success: false,
      message: `${ERRORS.DUPLICATE_KEY.message} for ${field}`,
      code: ERRORS.DUPLICATE_KEY.code,
    });
  }

  // Handle unexpected errors
  console.error('Unexpected error:', err);
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERRORS.INTERNAL_SERVER_ERROR.message,
    code: ERRORS.INTERNAL_SERVER_ERROR.code,
  });
}