'use strict';

export const renderLoginForm = (req, res) => {
    res.render('./auth/login', {
        authenticated: false,
    });
};

export const renderRegisterForm = (req, res) => {
    res.render('./auth/register', {
        authenticated: false,
    });
};
