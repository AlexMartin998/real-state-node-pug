'use strict';

import express from 'express';

import { setupMiddlewares } from './middlewares/index.js';
import {
    authRoutes,
    propertiesRoutes,
    publicRoutes,
    usersRoutes,
} from './routes/index.js';
import './db/db.js';

const app = express();

// Middlewares
setupMiddlewares(app);

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/properties', propertiesRoutes);
app.use('/', publicRoutes);

export default app;
