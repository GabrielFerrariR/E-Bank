import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorHandler from './middleWares/errorMiddleWare';
import UserRoute from './Routes/UserRoute';
import LoginRoute from './Routes/LoginRoute';
import authMiddleware from './middleWares/authorization';
import AccountRoute from './Routes/AccountRoute';

class App {
  server;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.server.get('/', (req, res, _next) => {
      res.status(200).json({ message: 'O front ainda está integrado com o back'}); 
    });
    this.server.use(errorHandler);
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use('/users', UserRoute);
    this.server.use('/login', LoginRoute);
    this.server.use('/account', authMiddleware, AccountRoute);
  }
}

export default new App().server;

