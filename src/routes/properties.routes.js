'use strict';

import { Router } from 'express';
import {
    createProperty,
    editProperty,
    renderAddImageView,
    renderCreatePropForm,
    renderEditView,
    renderMyProperties,
    saveImage,
} from '../controllers/index.js';
import {
    editPropertyRules,
    newPropertyRules,
    protectWithJwt,
    upload,
} from '../middlewares/index.js';

const router = Router();

// All routes will be protected
router.use(protectWithJwt);

router.get('/mine', renderMyProperties);

router
    .route('/create')
    .get(renderCreatePropForm)
    .post(newPropertyRules(), createProperty);

router
    .route('/add-image/:id')
    .get(renderAddImageView)
    .post(upload.single('image'), saveImage);

router
    .route('/edit/:id')
    .get(renderEditView)
    .post(editPropertyRules(), editProperty);

export default router;
