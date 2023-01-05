'use strict';

import { DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';

import db from '../db/db.js';

const User = db.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: DataTypes.STRING,
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        hooks: {
            beforeCreate: async function (user) {
                user.password = await bcryptjs.hash(user.password, 10);
            },
        },
    }
);

// Custom methods
User.prototype.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

export default User;
