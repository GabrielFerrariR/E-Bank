import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorTypes } from '../errors/catalog';
import LoginService from '../services/LoginService';


export default class LoginController {
  constructor(private _service: LoginService) {}

  async login(req: Request, res: Response, _next: NextFunction): Promise<void>{
    const { body } = req;
    const token = await this._service.login(body);
    res.status(StatusCodes.OK).json(token);
  }

  async validate(req: Request, res: Response, _next: NextFunction): Promise<void>{
    const { authorization } = req.headers;
    if (!authorization) throw new Error(ErrorTypes.InvalidToken);
    const token = await this._service.validate(authorization);
    res.status(StatusCodes.OK).json(token);
  }
}