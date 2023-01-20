'use strict';

import { genJWT } from '../helpers/index.js';
import { User } from '../models/index.js';

export const renderLoginForm = (req, res) => {
    const { _token } = req.cookies;
    if (_token) return res.redirect('/');

    res.render('./auth/login', {
        title: 'Iniciar Sesion',
        csrfToken: req.csrfToken(),
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        const matchPass = await user.comparePassword(password);
        // TODO: refactorizar los render de error
        if (!user || !matchPass)
            return res.render('auth/login', {
                title: 'Iniciar Sesion',
                errores: [
                    {
                        msg: 'Hubo un problema al iniciar sesión. Comprueba tu correo electrónico y contraseña o crea una cuenta.',
                    },
                ],
                csrfToken: req.csrfToken(),
            });

        if (!user.confirmed)
            return res.render('auth/login', {
                title: 'Iniciar Sesion',
                errores: [{ msg: 'Su cuenta no ha sido confirmada' }],
                csrfToken: req.csrfToken(),
            });

        // Generate JWT
        const jwt = await genJWT(user.id);

        return res
            .cookie('auth', true)
            .cookie('_token', jwt, { httpOnly: true }) // it wont allow access from JavaScript
            .redirect('/');
    } catch (error) {
        console.log(error);
        return res.render('auth/login', {
            title: 'Iniciar Sesion',
            errores: [
                {
                    msg: 'Hubo un problema al iniciar sesión. Comprueba tu correo electrónico y contraseña o crea una cuenta.',
                },
            ],
            csrfToken: req.csrfToken(),
        });
    }
};

export const logout = async (_req, res) => {
    return res
        .clearCookie('_token')
        .clearCookie('auth')
        .status(200)
        .redirect('/');
};

export const renderRegisterForm = (req, res) => {
    const { _token } = req.cookies;
    if (_token) return res.redirect('/');

    res.render('./auth/register', {
        title: 'Crear Cuenta',
        csrfToken: req.csrfToken(),
    });
};

export const registerNewUser = async (req, res) => {
    // const { name, email, password } = req.body;

    try {
        /* const newUser = await User.create({
            name,
            email,
            password,
            token: genTempToken(),
        });

        // Send confirmation email
        await emailRegister({ email, name, token: newUser.token }); */

        res.render('./templates/message', {
            title: 'Cuenta Creada Correctamente',
            message: `
                Usuario registrado satisfactoriamente, verifica tu email.

                ---> Acción no permitira en la Demo, clone el repo. <---
            `,
        });
    } catch (error) {
        console.log(error);
        // TODO:  render error view
    }
};

export const renderPasswordRecoveryForm = (req, res) => {
    res.render('./auth/recovery-password', {
        title: 'Recupera tu acceso a Bienes Raices',
        csrfToken: req.csrfToken(),
    });
};

export const confirmAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ where: { token } });

        if (!user)
            return res.render('./auth/confirm-account', {
                title: 'Error al confirmar la cuenta',
                message:
                    'Hubo un error al confirmar tu cuenta, intenta de nuevo.',
                error: true,
            });

        user.token = null;
        user.confirmed = true;
        await user.save();

        res.render('./auth/confirm-account', {
            title: 'Cuenta confirmada',
            message: 'La cuenta se confirmo correctamente.',
        });
    } catch (error) {
        console.log(error);
    }
};

export const genRecoveryToken = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !user.confirmed)
            return res.render('./auth/recovery-password', {
                title: 'Recupera tu acceso a Bienes Raices',
                csrfToken: req.csrfToken(),
                errores: [{ msg: 'Usuario no registrado!' }],
            });

        /*
        user.token = genTempToken();
        await user.save();

        // Send email with token/instructions
        await emailResetPassword({ email, name: user.name, token: user.token });
         */
        res.render('./templates/message', {
            title: 'Restablece tu Password',
            message: `
                Hemos enviado un email con las instruccionesUsuario.

                ---> Acción no permitira en la Demo, clone el repo. <---
            `,
        });
    } catch (error) {
        console.log(error);
        return res.render('./auth/recovery-password', {
            title: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'Usuario no registrado!' }],
        });
    }
};

export const renderPasswordResetForm = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ where: { token } });

        if (!user)
            return res.render('./auth/confirm-account', {
                title: 'Error al confirmar la cuenta',
                message:
                    'Hubo un error al confirmar tu cuenta, intenta de nuevo.',
                error: true,
            });

        res.render('./auth/reset-password', {
            title: 'Restablece tu Password',
            csrfToken: req.csrfToken(),
            message: 'Hemos enviado un email con las instrucciones.',
        });
    } catch (error) {
        console.log(error);
    }
};

export const genNewPassword = async (req, res) => {
    // const { token } = req.params;
    // const { password } = req.body;

    try {
        /*  // The user isn't validated because it's already done by the previous method <- only in MVC
        const user = await User.findOne({ where: { token } });
        user.password = await bcryptjs.hash(password, 10);
        user.token = null;

        await user.save(); */

        res.render('./auth/confirm-account', {
            title: 'Password Restablecido',
            csrfToken: req.csrfToken(),
            message: 'El Password se ha guardado correctamente.',
        });
    } catch (error) {
        console.log(error);
    }
};
