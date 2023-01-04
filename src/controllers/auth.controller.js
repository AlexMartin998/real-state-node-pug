'use strict';

import { User } from '../models/index.js';

export const renderLoginForm = (_req, res) => {
    res.render('./auth/login', {
        title: 'Iniciar Sesion',
    });
};

export const renderRegisterForm = (_req, res) => {
    res.render('./auth/register', {
        title: 'Crear Cuenta',
    });
};

export const registerNewUser = async (req, res) => {
    const user = await User.create(req.body);

    res.json({ user });
};

export const renderPasswordRecoveryForm = (req, res) => {
    res.render('./auth/recovery-password', {
        title: 'Recupera tu acceso a Bienes Raices',
    });
};
