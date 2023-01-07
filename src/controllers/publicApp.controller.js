'use strict';

import { Category, Price, Property } from './../models/index.js';

export const renderHome = async (req, res) => {
    try {
        const [
            categories,
            prices,
            recentlyAddedHouses,
            recentlyAddedDepartments,
        ] = await Promise.all([
            Category.findAll({ raw: true }),
            Price.findAll({ raw: true }),
            Property.findAll({
                limit: 3,
                where: { category_id: 1 },
                include: [{ model: Price, as: 'price' }],
                order: ['createdAt'],
            }),
            Property.findAll({
                limit: 3,
                where: { category_id: 1 },
                include: [{ model: Price, as: 'price' }],
                order: ['createdAt'],
            }),
        ]);

        res.render('home', {
            title: 'Inicio',
            categories,
            prices,
            recentlyAddedHouses,
            recentlyAddedDepartments,
        });
    } catch (error) {
        console.log(error);
    }
};

export const renderCategoriesView = (req, res) => {
    res.send('Category');
};

export const renderNotFoundPage = (req, res) => {
    res.send('404');
};

export const searcher = (req, res) => {
    res.send('Home');
};
