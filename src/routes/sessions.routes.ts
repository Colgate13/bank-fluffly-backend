import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();
/**
 * Repositorys
 * Services
 */
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  user.password = 'Nothing Here';

  return response.json({ user, token });
});

export default sessionsRouter;
