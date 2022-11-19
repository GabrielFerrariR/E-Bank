import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TransactionService from '../services/TransactionsService';


export default class TransactionsController {
  constructor(private _service: TransactionService) {}

  async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { body, user } = req;
    const result = await this._service.create(user, body);
    res.status(StatusCodes.CREATED).json(result);
  }
}