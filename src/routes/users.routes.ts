import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

usersRouter.get('/listAll', async (request, response) => {
  const { token, password, id } = request.body;

  const listUsers = new CreateUserService();

  if (token === '123456789' && password === '84656505' && id === 'souAdmin') {
    const accont = await listUsers.listAllAcconts();

    return response.json(accont);
  }

  const fakeList = {
    Name: 'Banco Colgate',
    Staff: 'Colgate ',
    by: 'Master Legends Banking',
  };

  return response.json(fakeList);
});

export default usersRouter;
