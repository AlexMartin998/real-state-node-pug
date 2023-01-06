'use strict';

import bcrypt from 'bcryptjs';

export const users = [
    {
        name: 'Alex',
        email: 'alex1@gmail.com',
        confirmed: 1,
        password: bcrypt.hashSync('123123', 10),
    },
    {
        name: 'Alex 2',
        email: 'alex2@gmail.com',
        confirmed: 1,
        password: bcrypt.hashSync('321321', 10),
    },
];
