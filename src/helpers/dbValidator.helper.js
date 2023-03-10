'use strict';

import { User } from '../models/index.js';

export const isAlreadyRegistered = async (query, collection) => {
    let model;

    const checkInCollection = () => {
        if (model)
            throw new Error(
                `The ${collection}${
                    query.includes('@') ? "'s email" : ' name'
                } is already registered!`
            );
    };

    switch (collection) {
        case 'user':
            model = await User.findOne({ where: { email: query } });
            return checkInCollection();

        default:
            throw new Error('Something went wrong!');
    }
};
