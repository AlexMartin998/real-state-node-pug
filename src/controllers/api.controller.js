'use strict';

import { Property, Price, Category } from '../models/index.js';

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll({
            include: [
                { model: Category, as: 'category' },
                { model: Price, as: 'price' },
            ],
        });

        res.status(200).json({ properties });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Something went wrong!' });
    }
};
