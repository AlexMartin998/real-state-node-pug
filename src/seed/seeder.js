import { exit } from 'node:process';

import { Category } from '../models/index.js';
import { categories } from './index.js';
import db from './../db/db.js';

export const importData = async () => {
    try {
        //Auth
        await db.authenticate();

        // gen columns
        await db.sync();

        // insert data
        await Category.bulkCreate(categories);
        console.log('Datos importados correctamente');
        exit(0); // correcto
    } catch (error) {
        console.log(error);
        exit(1); // error
    }
};
