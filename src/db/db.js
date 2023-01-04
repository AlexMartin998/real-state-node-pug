import { Sequelize } from 'sequelize';
import {
    DB_DIALECT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
} from '../config/index.js';

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST, // docker-compose-dev.yml
    dialect: DB_DIALECT,
    define: { timestamps: true },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

try {
    await db.authenticate();
    console.log('Successful connection to the database');
} catch (error) {
    console.log(error);
}
