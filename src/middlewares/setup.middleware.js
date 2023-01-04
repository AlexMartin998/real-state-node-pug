'use strict';

import express from 'express';

export const setupMiddlewares = app => {
    app.use(express.static('./src/public'));
    app.set('view engine', 'pug');
    app.set('views', './src/views');
    app.use(express.urlencoded({ extended: false })); // leer datos del front embebido

    // app.use(compression()).use(helmet());
    // app.use(morgan('dev'));

    // Other middlewares
};
