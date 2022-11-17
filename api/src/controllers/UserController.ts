import { Request, Response, NextFunction } from 'express';
import { Service } from '../interfaces/Service';
import { Controller } from '../interfaces/Controller';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../interfaces/IUser';

export default class UserController implements Controller {
  service: Service<IUser>;
  constructor(service: Service<IUser>){
    this.service = service;
  }
  async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { body } = req;
    const result = await this.service.create(body);
    res.status(StatusCodes.CREATED).json(result);
  }
  read(req: Request, res: Response, _next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  readOne(req: Request, res: Response, _next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(req: Request, res: Response, _next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }

}