'use strict';

import { Router } from 'express';
import {
    confirmAccount,
    genNewPassword,
    genRecoveryToken,
    login,
    registerNewUser,
    renderLoginForm,
    renderPasswordRecoveryForm,
    renderPasswordResetForm,
    renderRegisterForm,
} from '../controllers/index.js';
import {
    genNewPasswordRules,
    genRecoveryTokenRules,
    loginRules,
    signUpRules,
} from '../middlewares/index.js';

const router = Router();

router.route('/login').get(renderLoginForm).post(loginRules(), login);

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
