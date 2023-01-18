'use strict';

import bcrypt from 'bcryptjs';

export const users = [
    {
        name: 'Adrian',
        email: 'adrian@test.com',
        confirmed: 1,
        password: bcrypt.hashSync('123123', 10),
    },
    {
        name: 'Alex',
        email: 'alex@test.com',
        confirmed: 1,
        password: bcrypt.hashSync('321321', 10),
    },
];
