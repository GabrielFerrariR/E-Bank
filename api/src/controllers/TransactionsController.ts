import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TransactionService from '../services/TransactionsService';


export default class TransactionsController {
  constructor(private _service: TransactionService) {}

  async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { body, user: { username, accountId } } = req;
    const result = await this._service.create(username, accountId, body);
    res.status(StatusCodes.CREATED).json(result);
  }

  async read(req: Request, res: Response, _next: NextFunction) {
    const { user: { accountId } } = req;
    const result = await this._service.read(accountId);
    res.status(StatusCodes.OK).json(result);
  }

  async readCashIn(req: Request, res: Response, _next: NextFunction) {
    const { user: { accountId } } = req;
    const result = await this._service.readCashIn(accountId);
    res.status(StatusCodes.OK).json(result);
  }

  async readCashOut(req: Request, res: Response, _next: NextFunction) {
    const { user: { accountId  } } = req;
    const result = await this._service.readCashOut(accountId);
    res.status(StatusCodes.OK).json(result);
  }

}