'use strict';

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: true, msg: 'GET' });
});

export default router;
