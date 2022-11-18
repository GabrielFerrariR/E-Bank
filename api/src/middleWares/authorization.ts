import { NextFunction, Request, Response } from 'express';
import { ErrorTypes } from '../errors/catalog';
import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET || 'segredobemguardado';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Error(ErrorTypes.InvalidToken);
  jwt.verify(authorization, secret);
  next();
};

export default authMiddleware;
