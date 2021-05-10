import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRoutes from './sessions.routes';
import accontsRoutes from './accont.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/acconts', accontsRoutes);

export default routes;
