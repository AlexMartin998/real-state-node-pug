'use strict';

import { DataTypes } from 'sequelize';

import db from '../db/db.js';

const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
});

export default Category;
