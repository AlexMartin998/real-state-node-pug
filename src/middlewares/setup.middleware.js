'use strict';

export const setupMiddlewares = app => {
  // app.use(express.static('./src/public'));
  app.set('view engine', 'pug');
  app.set('views', './src/views');

  // app.use(express.urlencoded({ extended: false }));
  // app.use(compression()).use(helmet());
  // app.use(morgan('dev'));

  // Other middlewares
};
