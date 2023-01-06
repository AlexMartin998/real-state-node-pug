'use strict';

import multer from 'multer';
import path from 'path';
import { genTempToken } from '../helpers/index.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, genTempToken() + path.extname(file.originalname));
    },
});

export const upload = multer({ storage });
