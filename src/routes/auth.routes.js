'use strict';

import { Router } from 'express';
import {
    renderLoginForm,
    renderPasswordRecoveryForm,
    renderRegisterForm,
} from '../controllers/index.js';

const router = Router();

router.get('/login', renderLoginForm);
router.get('/signup', renderRegisterForm);
router.get('/olvide-password', renderPasswordRecoveryForm);

export default router;
