'use strict';

export const renderMyProperties = (req, res) => {
    res.render('./porperties/admin', {
        title: 'Mis propiedades',
        navbar: true,
    });
};

export const renderCreatePropForm = (req, res) => {
    res.render('./porperties/create', {
        title: 'Crear Propiedad',
        navbar: true,
    });
};
