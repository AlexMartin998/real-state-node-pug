'use strict';

import { Router } from 'express';
import {
    confirmAccount,
    registerNewUser,
    renderLoginForm,
    renderPasswordRecoveryForm,
    renderRegisterForm,
    genRecoveryToken,
    renderPasswordResetForm,
    genNewPassword,
} from '../controllers/index.js';
import {
    genNewPasswordRules,
    genRecoveryTokenRules,
    signUpRules,
} from '../middlewares/index.js';

const router = Router();

router.get('/login', renderLoginForm);

router
    .route('/signup')
    .get(renderRegisterForm)
    .post(signUpRules(), registerNewUser);

router
    .route('/forgot-password')
    .get(renderPasswordRecoveryForm)
    .post(genRecoveryTokenRules(), genRecoveryToken);

router.get('/confirm/:token', confirmAccount);

router
    .route('/forgot-password/:token')
    .get(renderPasswordResetForm)
    .post(genNewPasswordRules(), genNewPassword);

export default router;
