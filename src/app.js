import express from 'express';
import pageRoutes from './routes/page.routes.js';
import indexRoutes from './routes/index.routes.js';
import {SERVE} from './config.js';

import './config.js'

const app = express();

app.use(express.json());

app.use('/api', pageRoutes)
app.use('/api', indexRoutes)

export default app;