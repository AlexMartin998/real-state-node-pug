'use strict';

import { body, validationResult } from 'express-validator';
import { isAlreadyRegistered } from '../helpers/index.js';

export const validateRegister = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.render('auth/register', {
            title: 'Crear Cuenta',
            errores: errors.array(),
            csrfToken: req.csrfToken(),
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });

    return next();
};

export const validateRecoveryPass = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.render('auth/recovery-password', {
            title: 'Recupera tu acceso a Bienes Raices',
            errores: errors.array(),
            csrfToken: req.csrfToken(),
        });

    return next();
};

export const validateResetPass = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.render('auth/reset-password', {
            title: 'Restablece tu Password',
            errores: errors.array(),
            csrfToken: req.csrfToken(),
        });

    return next();
};

// Auths
export const emailPassRules = () => [
    body('email', 'Invalid email!').isEmail(),
    body('password', 'Password must be longer than 6 characters!').isLength({
        min: 6,
    }),
];

export const signUpRules = () => [
    body('name', 'Invalid name!').notEmpty(),
    ...emailPassRules(),
    body('repeat-password').custom((rp, { req }) => {
        if (rp !== req.body.password) throw new Error('Password do not match!');
        return true;
    }),
    validateRegister,

    body('email').custom(email => isAlreadyRegistered(email, 'user')),
    validateRegister,
];

export const genRecoveryTokenRules = () => [
    body('email', 'Invalid email!').isEmail(),
    validateRecoveryPass,
];

export const genNewPasswordRules = () => [
    body('password', 'Password is required!').notEmpty(),
    body('password', 'Password must be longer than 6 characters!').isLength({
        min: 6,
    }),
    validateResetPass,

    // checkToken,
];
