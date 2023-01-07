'use strict';

import { Category, Price, Property } from './../models/index.js';

export const renderMyProperties = async (req, res) => {
    const { id } = req.authenticatedUser;

    try {
        const properties = await Property.findAll({
            where: { user_id: id },
            include: [{ model: Category }, { model: Price, as: 'price' }], // as xq en esa relacion si estableci as
        });

        res.render('./properties/admin', {
            title: 'Mis propiedades',
            properties,
        });
    } catch (error) {
        console.log(error);
    }
};

export const renderCreatePropForm = async (req, res) => {
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ]);

    res.render('./properties/create', {
        title: 'Crear Propiedad',
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

        res.redirect(`/properties/add-image/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const renderAddImageView = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByPk(id);
        // exista la property y NO este publicada y sea del user auth
        if (
            !property ||
            property.published ||
            +property.user_id !== +req.authenticatedUser.id
        )
            return res.redirect('/properties/mine');

        res.render('./properties/add-image', {
            title: `Agregar imagen: ${property.title}`,
            property,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const saveImage = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByPk(id);
        // exista la property y NO este publicada y sea del user auth
        if (
            !property ||
            property.published ||
            +property.user_id !== +req.authenticatedUser.id
        )
            return res.redirect('/properties/mine');

        // save img - req.file  lo registra multer
        property.image = req.file.filename;
        property.published = 1;
        await property.save();

        // ya no tiene el control del res, sino dropzone en el front, pero se lo incluye para q siga el flujo
        return res.redirect('/properties/mine');
    } catch (error) {
        console.log(error);
    }
};
