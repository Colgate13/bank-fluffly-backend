import { Router } from 'express';
import CreateAccontService from '../services/CreateAccontService';
import AccontService from '../services/AccontService';
import LogAccontService from '../services/LogAccontService';
import TransactionsService from '../services/TransactionsService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const accontRouter = Router();

accontRouter.post('/create', ensureAuthenticated, async (request, response) => {
  const { password, interKey, keyFree } = request.body;
  const createaccont = new CreateAccontService();

  const accont = await createaccont.execute({
    idUser: request.user.id,
    interKey,
    keyFree,
    password,
  });

  return response.json(accont);
});

accontRouter.post('/deposity', ensureAuthenticated, async (request, response) => {
  const { passwordAccont, value } = request.body;
  const createAccont = new AccontService();
  const logAccontService = new LogAccontService();

  const accont = await createAccont.deposity({
    id: request.user.id,
    password: passwordAccont,
    value,
  });
  await logAccontService.execute({
    accont_id: accont.accont_id,
    type: true,
    value,
  });

  return response.json(accont);
});

accontRouter.post('/withdraw', ensureAuthenticated, async (request, response) => {
  const { passwordAccont, value } = request.body;
  const createAccont = new AccontService();
  const logAccontService = new LogAccontService();

  const accont = await createAccont.withdraw({
    id: request.user.id,
    password: passwordAccont,
    value,
  });
  await logAccontService.execute({
    accont_id: accont.accont_id,
    type: false,
    value,
  });

  return response.json(accont);
});

accontRouter.post('/transactions', ensureAuthenticated, async (request, response) => {
  const {
    keyFree, password, message, value,
  } = request.body;
  const transactionsService = new TransactionsService();
  // const logTransactionsService = new LogTransactionsService();
  const transaction = await transactionsService.execute({
    sender_id: request.user.id,
    keyFree,
    password,
    value,
  });
  const transactionLog = await transactionsService.log({
    sender_keyFree: transaction.keyFree,
    keyFree,
    message,
    value,
  });

  return response.json(transactionLog);
});

accontRouter.get('/listAllInternalmovement', async (request, response) => {
  const { token, password, id } = request.body;

  const findAll = new AccontService();

  if (token === '123456789' && password === '84656505' && id === 'souAdmin') {
    const accont = await findAll.listAllAccontsInternalmovement();

    return response.json(accont);
  }

  const fakeList = {
    Name: 'Banco Colgate',
    Staff: 'Colgate ',
    by: 'Master Legends Banking',
  };

  return response.json(fakeList);
});

accontRouter.get('/listAll', async (request, response) => {
  const { token, password, id } = request.body;

  const findAll = new CreateAccontService();

  if (token === '123456789' && password === '84656505' && id === 'souAdmin') {
    const accont = await findAll.listAllAcconts();

    return response.json(accont);
  }

  const fakeList = {
    Name: 'Banco Colgate',
    Staff: 'Colgate ',
    by: 'Master Legends Banking',
  };

  return response.json(fakeList);
});

accontRouter.get('/listAllTransactions', async (request, response) => {
  const { token, password, id } = request.body;

  const findAll = new TransactionsService();

  if (token === '123456789' && password === '84656505' && id === 'souAdmin') {
    const accont = await findAll.listAllTransactions();

    return response.json(accont);
  }

  const fakeList = {
    Name: 'Banco Colgate',
    Staff: 'Colgate ',
    by: 'Master Legends Banking',
  };

  return response.json(fakeList);
});
export default accontRouter;
