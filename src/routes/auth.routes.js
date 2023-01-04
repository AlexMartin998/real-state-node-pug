'use strict';

import { Router } from 'express';
import {
    registerNewUser,
    renderLoginForm,
    renderPasswordRecoveryForm,
    renderRegisterForm,
} from '../controllers/index.js';
import { signUpRules } from '../middlewares/index.js';

const router = Router();

router.get('/login', renderLoginForm);

router
    .route('/signup')
    .get(renderRegisterForm)
    .post(signUpRules(), registerNewUser);
router.get('/olvide-password', renderPasswordRecoveryForm);

export default router;
