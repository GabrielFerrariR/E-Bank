import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const service = new UserService();
const controller = new UserController(service);

const router = Router();

router.post('/', (req, res, next) => controller.create(req, res, next));
router.get('/', (req, res, next) => controller.read(req, res, next));
router.get('/:id', (req, res, next) => controller.readOne(req, res, next));
export default router;