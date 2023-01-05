'use strict';

import { Router } from 'express';
import {
    renderCreatePropForm,
    renderMyProperties,
} from '../controllers/index.js';

const router = Router();

router.get('/mine', renderMyProperties);

router.route('/create').get(renderCreatePropForm);

export default router;
