'use strict';

import { Router } from 'express';
import {
    createProperty,
    deleteProperty,
    editProperty,
    renderAddImageView,
    renderCreatePropForm,
    renderEditView,
    renderMyProperties,
    renderPropertyView,
    saveImage,
} from '../controllers/index.js';
import {
    editPropertyRules,
    identifyUser,
    newPropertyRules,
    protectWithJwt,
    upload,
} from '../middlewares/index.js';

const router = Router();

// All routes will be protected
// router.use(protectWithJwt);

router.get('/mine', protectWithJwt, renderMyProperties);

router
    .route('/create')
    .get(protectWithJwt, renderCreatePropForm)
    .post(protectWithJwt, newPropertyRules(), createProperty);

router
    .route('/add-image/:id')
    .get(protectWithJwt, renderAddImageView)
    .post(protectWithJwt, upload.single('image'), saveImage);

router
    .route('/edit/:id')
    .get(protectWithJwt, renderEditView)
    .post(protectWithJwt, editPropertyRules(), editProperty);

router.route('/delete/:id').post(protectWithJwt, deleteProperty);

// public
router.get('/:id', identifyUser, renderPropertyView);

export default router;
