'use strict';

import express from 'express';
import { usersRoutes } from './routes/index.js';

const app = express();

// Routes
app.use('/users', usersRoutes);

export default app;
