'use strict';

import { DataTypes } from 'sequelize';

import db from '../db/db.js';

const Message = db.define('messages', {
    message: {
        type: DataTypes.STRING(210),
        allowNull: false,
    },
});

export default Message;
