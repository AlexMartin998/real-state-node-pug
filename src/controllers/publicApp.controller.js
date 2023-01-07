'use strict';

export const renderHome = (req, res) => {
    res.render('home', {
        title: 'Inicio',
    });
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
