'use strict';

export const renderLoginForm = (req, res) => {
    res.render('./auth/login', {
        title: 'Iniciar Sesion',
    });
};

export const renderRegisterForm = (req, res) => {
    res.render('./auth/register', {
        title: 'Crear Cuenta',
    });
};

export const renderPasswordRecoveryForm = (req, res) => {
    res.render('./auth/recovery-password', {
        title: 'Recupera tu acceso a Bienes Raices',
    });
};
