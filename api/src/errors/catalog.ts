import { StatusCodes } from 'http-status-codes';

export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  ObjectNotFound = 'ObjectNotFound',
  AlreadyInUse = 'AlreadyInUse',
  InvalidToken = 'InvalidToken',
  WrongCredentials = 'WrongCredentials',
}

type ErrorResponseObject = { 
  message: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: StatusCodes.NOT_FOUND,
  },
  AlreadyInUse: {
    message: 'User already in use',
    httpStatus: StatusCodes.BAD_REQUEST
  },
  InvalidToken: {
    message: 'Token must be valid',
    httpStatus: StatusCodes.UNAUTHORIZED
  },
  WrongCredentials: {
    message: 'Wrong username or password',
    httpStatus: StatusCodes.UNAUTHORIZED
  }
};