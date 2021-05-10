import 'reflect-metadata';
import express from 'express';

import routes from './routes/index';

import './database';

const PORT = process.env.PORT || 3131;
const app = express();

app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`🐱‍👤> Server running! 🧛‍♀️ ${PORT}`));
