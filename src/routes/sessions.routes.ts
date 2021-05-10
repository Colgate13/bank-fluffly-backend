import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

import AppError from '../errors/AppError';

const sessionsRouter = Router();
/**
 * Repositorys
 * Services
 */
sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    try {
      user.password = 'Nothing Here';
    } catch (error) {
      throw new AppError('Error internal.');
    }
    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
