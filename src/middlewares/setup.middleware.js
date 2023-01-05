'use strict';

import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

export const setupMiddlewares = app => {
    app.use(express.static('./src/public'));
    app.set('view engine', 'pug');
    app.set('views', './src/views');

    // habilitar la lectura de datos del formulario del front embebido
    app.use(express.urlencoded({ extended: false }));

    // app.use(compression()).use(helmet());
    // app.use(morgan('dev'));

    // Other middlewares
    app.use(cookieParser());
    app.use(csrf({ cookie: true }));
};
