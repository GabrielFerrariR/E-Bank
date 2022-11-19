import { NextFunction, Request, Response } from 'express';
import { ErrorTypes } from '../errors/catalog';
import jwt from 'jsonwebtoken';


declare module 'express-serve-static-core' {
  interface Request {
    user: string
  }
}


const secret = process.env.JWT_SECRET || 'segredobemguardado';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Error(ErrorTypes.InvalidToken);
  const decoded = jwt.verify(authorization , secret);
  const user = Object.values(decoded)[0];
  req.user = user.username;
  next();
};

export default authMiddleware;
