'use strict';

import jwt from 'jsonwebtoken';
import { SECRETORKEY_JWT } from '../config/index.js';
import { User } from '../models/index.js';

export const identifyUser = async (req, res, next) => {
    const { _token } = req.cookies;

    if (!_token) {
        req.user = null;
        return next();
    }

    try {
        const { id } = jwt.verify(_token, SECRETORKEY_JWT);
        const user = await User.scope('removePassword').findByPk(id);
        if (user) req.user = user;

        return next();
    } catch (error) {
        console.log(error);
        return res.clearCookie('_token').redirect('/auth/login');
    }
};
