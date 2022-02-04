import { Router } from 'express';
import AccontUserService from '../services/AccontFindsService';
import AccontService from '../services/AccontMoneyService';
import TransactionsService from '../services/TransactionsService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import LogAccontService from '../services/LogAccontService';

const accontRouter = Router();

accontRouter.post('/FindkeyFree', ensureAuthenticated, async (request, response) => {
  const { keyFree } = request.body;
  const FindAccontKeyFree = new AccontUserService();

  const accont = await FindAccontKeyFree.findAccontKeyFree(
    keyFree,
  );

  return response.json(accont);
});

accontRouter.post('/FindId', ensureAuthenticated, async (request, response) => {
  const { id } = request.body;
  const FindAccontId = new AccontUserService();

  const accont = await FindAccontId.findAccontId(id);

  return response.json(accont);
});

accontRouter.post('/deposity', ensureAuthenticated, async (request, response) => {
  const { passwordAccont, value } = request.body;
  const createAccont = new AccontService();

  const accont = await createAccont.deposity({
    id: request.user.id,
    password: passwordAccont,
    value,
  });

  return response.json(accont);
});

accontRouter.post('/withdraw', ensureAuthenticated, async (request, response) => {
  const { passwordAccont, value } = request.body;
  const createAccont = new AccontService();

  const accont = await createAccont.withdraw({
    id: request.user.id,
    password: passwordAccont,
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
    sender_keyFree: transaction.key_free,
    keyFree,
    message,
    value,
  });

  return response.json(transactionLog);
});

accontRouter.get('/logs/internal', ensureAuthenticated, async (request, response) => {

  const logAccontService = new LogAccontService();
  // const logTransactionsService = new LogTransactionsService();
  const transaction = await logAccontService.search(request.user.id);

  return response.json(transaction);
});

accontRouter.get('/logs/transactions', ensureAuthenticated, async (request, response) => {

  const transactionsService = new TransactionsService();
  // const logTransactionsService = new LogTransactionsService();
  const transaction = await transactionsService.search(request.user.id);

  return response.json(transaction);
});

export default accontRouter;
