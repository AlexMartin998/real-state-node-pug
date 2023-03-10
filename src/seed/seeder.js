import { exit } from 'node:process';

import { Category, Price, Property, User } from '../models/index.js';
import { categories, prices, properties, users } from './index.js';
import db from './../db/db.js';

const importData = async () => {
    try {
        //Auth
        await db.authenticate();

        // gen columns
        await db.sync();

        // insert data
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users),
            Property.bulkCreate(properties),
        ]);

        console.log('Datos importados correctamente');
        exit(0); // correcto
    } catch (error) {
        console.log(error);
        exit(1); // error
    }
};

export const deleteData = async () => {
    try {
        // await Promise.all([
        //     Category.destroy({ where: {}, truncate: true }),
        //     Price.destroy({ where: {}, truncate: true }),
        // ]);
        await db.sync({ force: true });
        console.log('\nDatos eliminados correctamente');
        exit(0);
    } catch (error) {
        console.log(error);
        exit(1); // error
    }
};

if (process.argv[2] === '-i') importData();
if (process.argv[2] === '-d') deleteData();
