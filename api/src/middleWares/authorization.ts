import { NextFunction, Request, Response } from 'express';
import { ErrorTypes } from '../errors/catalog';
import jwt from 'jsonwebtoken';
import { ReqUser } from '../interfaces/IUser';


declare module 'express-serve-static-core' {
  interface Request {
    user: ReqUser
  }
}


const secret = process.env.JWT_SECRET || 'segredobemguardado';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Error(ErrorTypes.InvalidToken);
  const decoded = jwt.verify(authorization , secret);
  const user = Object.values(decoded)[0];
  req.user = { username: user.username, accountId: user.accountId};
  next();
};

export default authMiddleware;
