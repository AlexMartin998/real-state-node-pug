'use strict';

import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';

import { SECRETORKEY_JWT } from '../config/index.js';

// Asi podriamos tener un middleware que valide si un user pago su membresia

export const protectWithJwt = async (req, res, next) => {
    const { _token } = req.cookies; // asi lo almacena cookieParser
    if (!_token) return res.redirect('/auth/login');

    try {
        const { id } = jwt.verify(_token, SECRETORKEY_JWT);
        const user = await User.scope('removePassword').findByPk(id);
        if (!user || !user.confirmed)
            return res.clearCookie('_token').redirect('auth/login');

        req.authenticatedUser = user;

        return next();
    } catch (error) {
        console.log(error);
        return res.clearCookie('_token').redirect('auth/login');
    }
};
