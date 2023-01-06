'use strict';

import { Router } from 'express';
import {
    createProperty,
    renderAddImageView,
    renderCreatePropForm,
    renderMyProperties,
} from '../controllers/index.js';
import { newPropertyRules, protectWithJwt } from '../middlewares/index.js';

const router = Router();

// All routes will be protected
router.use(protectWithJwt);

router.get('/mine', renderMyProperties);

router
    .route('/create')
    .get(renderCreatePropForm)
    .post(newPropertyRules(), createProperty);

router.route('/add-image/:id').get(renderAddImageView);

export default router;
