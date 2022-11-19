import { Router } from 'express';
import AccountService from '../services/AccountService';
import AccountController from '../controllers/AccountsController';

const service = new AccountService();
const controller = new AccountController(service);

const router = Router();

router.get('/balance', (req, res, next) => controller.readOne(req, res, next));
export default router;
