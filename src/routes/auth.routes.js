'use strict';

import { Router } from 'express';
import { renderLoginForm, renderRegisterForm } from '../controllers/index.js';

const router = Router();

router.get('/login', renderLoginForm);
router.get('/signup', renderRegisterForm);

export default router;
