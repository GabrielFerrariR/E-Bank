import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/LoginService';


export default class LoginController {
  constructor(private _service: LoginService) {}

  async login(req: Request, res: Response, _next: NextFunction): Promise<void>{
    const { body } = req;
    const token = await this._service.login(body);
    res.status(StatusCodes.OK).json(token);
  }
}