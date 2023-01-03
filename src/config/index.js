'use strict';

import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'producction') config();

export const PORT = process.env.PORT;
