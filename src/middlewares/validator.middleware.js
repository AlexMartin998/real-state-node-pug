'use strict';

import { body, validationResult } from 'express-validator';
import { isAlreadyRegistered } from '../helpers/index.js';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    return next();
};
export const validateRegister = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.render('auth/register', {
            title: 'Crear Cuenta',
            errores: errors.array(),
            user: {
                name: req.body.name,
                email: req.body.email,
            },
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
