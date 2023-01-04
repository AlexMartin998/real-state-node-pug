'use strict';

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('./auth/login');
});

export default router;
