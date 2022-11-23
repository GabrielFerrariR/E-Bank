import { Request, Response, NextFunction } from 'express';
import { Service } from '../interfaces/Service';
import { Controller } from '../interfaces/Controller';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../interfaces/IUser';

export default class UserController implements Controller {
  constructor(private _service: Service<IUser>){}

  async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { body } = req;
    const result = await this._service.create(body);
    res.status(StatusCodes.CREATED).json(result);
  }

  read(_req: Request, _res: Response, _next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async readOne(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    res.status(StatusCodes.OK).json(result);
  }

  update(_req: Request, _res: Response, _next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(_req: Request, _res: Response, _next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }

}