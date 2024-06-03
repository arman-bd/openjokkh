import { Router } from 'express';
import * as captchaController from '../controllers/captcha_controller';

const router = Router();

router.post('/validate', captchaController.validateCaptcha);
router.get('/challenge', captchaController.getChallenge);

export default router;
