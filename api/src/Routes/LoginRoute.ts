import { Router } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';

const service = new LoginService();
const controller = new LoginController(service);

const router = Router();

router.post('/', (req, res, next) => controller.login(req, res, next));
router.post('/validate', (req, res, next) => controller.validate(req, res, next));
export default router;