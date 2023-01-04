'use strict';

import express from 'express';

import { setupMiddlewares } from './middlewares/index.js';
import { authRoutes, usersRoutes } from './routes/index.js';

const app = express();

// Middlewares
setupMiddlewares(app);

// Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

export default app;
