import { Request, Response, NextFunction } from 'express';
import AccountService from '../services/AccountService';
import { Controller } from '../interfaces/Controller';
import { StatusCodes } from 'http-status-codes';

export default class AccountsController implements 
Omit<Controller, 'read' | 'create' | 'update' | 'delete'> {
  constructor(private _service: AccountService) {}
  
  async readOne(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { user: { username } } = req;
    const result = await this._service.readOne(username);
    res.status(StatusCodes.OK).json(result);
  }
}