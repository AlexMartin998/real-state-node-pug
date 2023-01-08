'use strict';

import { unlink } from 'node:fs/promises';
import { isAdvertiser } from '../helpers/index.js';
import { Category, Price, Property, Message } from './../models/index.js';

export const renderMyProperties = async (req, res) => {
    const { id } = req.authenticatedUser;
    const { page } = req.query;

    // pagination
    const expression = /^[1-9]$/;
    if (!expression.test(page)) return res.redirect('/properties/mine?page=1');
    const limit = 10;
    const offset = page * limit - limit;

    try {
        const [properties, total] = await Promise.all([
            Property.findAll({
                limit,
                offset,
                where: { user_id: id },
                include: [
                    { model: Category, as: 'category' },
                    { model: Price, as: 'price' },
                ], // as xq en esa relacion si estableci as - si en el model tiene as aqui tb debe tener sino da error
            }),
            Property.count({ where: { user_id: id } }),
        ]);

        res.render('./properties/admin', {
            title: 'Mis propiedades',
            properties,
            csrfToken: req.csrfToken(),

            // pagination
            pages: Math.ceil(total / limit),
            page: +page,
            total,
            offset,
            limit,
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

export const renderEditView = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByPk(id);
        if (!property || +property.user_id !== +req.authenticatedUser.id)
            return res.redirect('/properties/mine');

        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
        ]);

        res.render('./properties/edit', {
            title: `Editar Propiedad: ${property.title}`,
            categories,
            prices,
            csrfToken: req.csrfToken(),
            add: property,
        });
    } catch (error) {
        console.log(error);
    }
};

export const editProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByPk(id);
        if (!property || +property.user_id !== +req.authenticatedUser.id)
            return res.redirect('/properties/mine');

        const { category: category_id, price: price_id, ...rest } = req.body;
        property.set({
            category_id,
            price_id,
            ...rest,
        });

        await property.save();

        res.redirect('/properties/mine');
    } catch (error) {
        console.log(error);
    }
};

export const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByPk(id);
        if (!property || +property.user_id !== +req.authenticatedUser.id)
            return res.redirect('/properties/mine');

        // delete propertie and its img
        await unlink(`./src/public/uploads/${property.image}`);
        await property.destroy();

        res.redirect('/properties/mine');
    } catch (error) {
        console.log(error);
    }
};

export const renderPropertyView = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByPk(id, {
            include: [
                { model: Category, as: 'category' },
                { model: Price, as: 'price' },
            ],
        });
        if (!property) return res.redirect('/404');

        res.render('./properties/show', {
            title: property.title,
            property,
            csrfToken: req.csrfToken(),
            user: req.user,
            isAdvertiser: isAdvertiser(req.user?.id, property.user_id),
        });
    } catch (error) {
        console.log(error);
    }
};

export const sendMessage = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    const { id: property_id } = req.params;
    const { id: user_id } = req.user;

    try {
        const property = await Property.findByPk(id, {
            include: [
                { model: Category, as: 'category' },
                { model: Price, as: 'price' },
            ],
        });
        if (!property) return res.redirect('/404');

        await Message.create({ message, property_id, user_id });

        res.redirect('/');
        // res.render('./properties/show', {
        //     title: property.title,
        //     property,
        //     csrfToken: req.csrfToken(),
        //     user: req.user,
        //     isAdvertiser: isAdvertiser(req.user?.id, property.user_id),
        //     sent: true,
        // });
    } catch (error) {
        console.log(error);
    }
};
