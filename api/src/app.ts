import  * as express from 'express';
import 'express-async-errors';
import * as cors from 'cors';
import UserRoute from './Routes/UserRoute';
import errorHandler from './middleWares/errorMiddleWare';

class App {
  server;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.server.get('/', (req, res, next) => {
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
  }
}

export default new App().server;

