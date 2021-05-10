import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  } catch (error) {
    return response.status(error.statusCode).json({ error: error.message });
  }
});

usersRouter.get('/listAll', async (request, response) => {
  const { token, password, id } = request.body;

  const listUsers = new CreateUserService();

  if (token === '123456789' && password === '84656505' && id === 'souAdmin') {
    try {
      const accont = await listUsers.listAllAcconts();

      return response.json(accont);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }

  const fakeList = {
    Name: 'Banco Colgate',
    Staff: 'Colgate ',
    by: 'Master Legends Banking',
  };

  return response.json(fakeList);
});

export default usersRouter;
