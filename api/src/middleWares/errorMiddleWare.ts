import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = ( err: Error | ZodError, _req, res, _next,) => {
  if (err instanceof ZodError) { 
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
  }
  // console.error(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'internal error' });
};

export default errorHandler;
