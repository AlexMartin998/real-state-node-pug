'use strict';

import { Router } from 'express';
import {
    registerNewUser,
    renderLoginForm,
    renderPasswordRecoveryForm,
    renderRegisterForm,
} from '../controllers/index.js';

const router = Router();

router.get('/login', renderLoginForm);

router.route('/signup').get(renderRegisterForm).post(registerNewUser);
router.get('/olvide-password', renderPasswordRecoveryForm);

export default router;
