import { Router } from 'express';
import TransactionService from '../services/TransactionsService';
import TransactionController from '../controllers/TransactionsController';

const service = new TransactionService();
const controller = new TransactionController(service);

const router = Router();

router.post('/', (req, res, next) => controller.create(req, res, next));
router.get('/', (req, res, next) => controller.read(req, res, next));
router.get('/cashout', (req, res, next) => controller.readCashOut(req, res, next));
router.get('/cashin', (req, res, next) => controller.readCashIn(req, res, next));
export default router;
