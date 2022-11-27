import { Request, Response, NextFunction } from 'express';
import { Service } from '../interfaces/Service';
import { Controller } from '../interfaces/Controller';
import { StatusCodes } from 'http-status-codes';
import { IUserResponse } from '../interfaces/IUser';
import { Token } from '../interfaces/Token';

export default class UserController implements Omit<Controller, 'read' | 'update' | 'delete'> {
  constructor(private _service: 
    Omit<Service<IUserResponse | Token>, 'read' | 'update' | 'delete' >){}

  async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { body } = req;
    const result = await this._service.create(body);
    res.status(StatusCodes.CREATED).json(result);
  }

  async readOne(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    res.status(StatusCodes.OK).json(result);
  }
}