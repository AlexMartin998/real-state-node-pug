'use strict';

import { DataTypes } from 'sequelize';

import db from '../db/db.js';

const Price = db.define('Price', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
});

export default Price;
