import { Router } from 'express';
import TransactionService from '../services/TransactionsService';
import TransactionController from '../controllers/TransactionsController';

const service = new TransactionService();
const controller = new TransactionController(service);

const router = Router();

router.post('/cashout', (req, res, next) => controller.create(req, res, next));
export default router;
