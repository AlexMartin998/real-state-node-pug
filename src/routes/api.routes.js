'use strict';

import { Router } from 'express';
import { getAllProperties } from '../controllers/index.js';

const router = Router();

router.get('/properties', getAllProperties);

export default router;
