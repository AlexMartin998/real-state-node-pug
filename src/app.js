'use strict';

import express from 'express';

import { setupMiddlewares } from './middlewares/index.js';
import { authRoutes, propertiesRoutes, usersRoutes } from './routes/index.js';
import './db/db.js';

const app = express();

// Middlewares
setupMiddlewares(app);

// Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/properties', propertiesRoutes);

export default app;
