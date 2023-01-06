'use strict';
import { Category, Price, Property } from './../models/index.js';

export const renderMyProperties = (req, res) => {
    res.render('./properties/admin', {
        title: 'Mis propiedades',
        navbar: true,
    });
};

export const renderCreatePropForm = async (req, res) => {
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ]);

    res.render('./properties/create', {
        title: 'Crear Propiedad',
        navbar: true,
        categories,
        prices,
        csrfToken: req.csrfToken(),
    });
};

export const createProperty = async (req, res) => {
    const { category: category_id, price: price_id, ...rest } = req.body;
    const { id: user_id } = req.authenticatedUser;

    try {
        const newProperty = await Property.create({
            category_id,
            price_id,
            user_id,
            image: '',
            ...rest,
        });
        const { id } = newProperty;

        res.redirect(`/add-image/${id}`);
    } catch (error) {
        console.log(error);
    }
};
