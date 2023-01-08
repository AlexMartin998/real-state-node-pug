'use strict';

import { Router } from 'express';
import { protectWithJwt } from '../middlewares/index.js';
import { renderMessages } from '../controllers/index.js';

const router = Router();

// All routes will be protected
router.use(protectWithJwt);

router.route('/:propertyId').get(renderMessages);

export default router;
