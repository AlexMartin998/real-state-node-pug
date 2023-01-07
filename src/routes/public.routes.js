'use strict';

import { Router } from 'express';

import {
    renderCategoriesView,
    renderHome,
    renderNotFoundPage,
    searcher,
} from './../controllers/index.js';

const router = Router();

router.get('/', renderHome);

router.get('categories/:id', renderCategoriesView);

router.get('/404', renderNotFoundPage);

router.post('/search', searcher);

export default router;
