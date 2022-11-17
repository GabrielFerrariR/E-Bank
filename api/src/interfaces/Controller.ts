import { NextFunction, Request, Response } from 'express';

export interface Controller {
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  read(req: Request, res: Response, next: NextFunction): Promise<void>;
  readOne(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}