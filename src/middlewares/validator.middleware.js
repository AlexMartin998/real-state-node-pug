'use strict';

import { body, validationResult } from 'express-validator';
import { Category, Price } from './../models/index.js';
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

export const validateLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.render('auth/login', {
            title: 'Iniciar Sesion',
            errores: errors.array(),
            csrfToken: req.csrfToken(),
        });

    return next();
};

export const validateNewProperty = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
        ]);
        // console.log(req.body);

        return res.render('properties/create', {
            title: 'Crear Propiedad',
            errores: errors.array(),
            categories,
            prices,
            csrfToken: req.csrfToken(),
            add: req.body,
        });
    }

    return next();
};

export const validateEditProperty = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
        ]);
        // console.log(req.body);

        return res.render('properties/edit', {
            title: 'Editar Propiedad',
            errores: errors.array(),
            categories,
            prices,
            csrfToken: req.csrfToken(),
            add: req.body,
        });
    }

    return next();
};

// Auths
export const emailPassRules = () => [
    body('email', 'Invalid email!').isEmail(),
    body('password', 'Password must be longer than 6 characters!').isLength({
        min: 6,
    }),
];

export const loginRules = () => [
    body('email', 'El Email es obligatorio').isEmail(),
    body('password', 'El Password es obligatorio').isLength({
        min: 6,
    }),
    validateLogin,
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
];

// Properties
export const newPropertyRules = () => [
    body('title', 'Title is required!').notEmpty(),
    body('description', 'Description is required!')
        .notEmpty()
        .isLength({ max: 210 })
        .withMessage('Description is too long!'),
    body('category', 'Category is required!').isNumeric(),
    body('price', 'Select a price range!').isNumeric(),
    body('rooms', 'Select the number of rooms!').isNumeric(),
    body('parking', 'Select the number of parking spaces!').isNumeric(),
    body('wc', 'Select the number of wc!').isNumeric(),
    body('lat', 'Locate the Property on the map!').isNumeric(),
    validateNewProperty,
];
export const editPropertyRules = () => [
    body('title', 'Title is required!').notEmpty(),
    body('description', 'Description is required!')
        .notEmpty()
        .isLength({ max: 210 })
        .withMessage('Description is too long!'),
    body('category', 'Category is required!').isNumeric(),
    body('price', 'Select a price range!').isNumeric(),
    body('rooms', 'Select the number of rooms!').isNumeric(),
    body('parking', 'Select the number of parking spaces!').isNumeric(),
    body('wc', 'Select the number of wc!').isNumeric(),
    body('lat', 'Locate the Property on the map!').isNumeric(),
    validateEditProperty,
];
