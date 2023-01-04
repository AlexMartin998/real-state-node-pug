'use strict';

import { genTempToken } from '../helpers/index.js';
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
    const { name, email, password } = req.body;

    try {
        await User.create({
            name,
            email,
            password,
            token: genTempToken(),
        });

        res.render('./templates/message', {
            title: 'Cuenta Creada Correctamente',
            message:
                'Usuario registrado satisfactoriamente, verifica tu email.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Algo salió mal!' });
    }
};

export const renderPasswordRecoveryForm = (req, res) => {
    res.render('./auth/recovery-password', {
        title: 'Recupera tu acceso a Bienes Raices',
    });
};
