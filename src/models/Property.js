'use strict';

import { DataTypes } from 'sequelize';

import db from '../db/db.js';

const Property = db.define('Property', {
    //En lugar de un id autoincremental generara un UUID como en Mongo
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, // > STRING
        allowNull: false,
    },

    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parking: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    wc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export default Property;
