'use strict';

import { Sequelize } from 'sequelize';

import { utils } from '../config/index.js';
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
                where: { category_id: utils.house_id },
                include: [{ model: Price, as: 'price' }],
                order: [['createdAt', 'DESC']],
            }),
            Property.findAll({
                limit: 3,
                where: { category_id: utils.department_id },
                include: [{ model: Price, as: 'price' }],
                order: [['createdAt', 'DESC']],
            }),
        ]);

        res.render('home', {
            title: 'Inicio',
            categories,
            prices,
            recentlyAddedHouses,
            recentlyAddedDepartments,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const renderCategoriesView = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) return res.redirect('/404');

        const properties = await Property.findAll({
            where: { category_id: id },
            include: { model: Price, as: 'price' },
        });

        res.render('./category', {
            title: `${category.name}s en Venta`,
            properties,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const renderNotFoundPage = (req, res) => {
    res.render('404', {
        title: 'No encontrado',
        csrfToken: req.csrfToken(),
    });
};

export const searcher = async (req, res) => {
    const { query } = req.body;

    try {
        const properties = await Property.findAll({
            // no funca con el template string: like de SQL
            where: { title: { [Sequelize.Op.like]: '%' + query + '%' } },
            include: { model: Price, as: 'price' },
        });

        res.render('./searcher', {
            title: 'Resultados de la Búsqueda',
            properties,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
};
