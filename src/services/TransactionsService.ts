import { getCustomRepository, getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositorys/TransactionsRepository';
import Accont from '../models/Accont';
import Transactions from '../models/Transactions';

interface Request {// Tipagem dos tados que vamos receber
  sender_id: string;
  keyFree: string;
  password: string;
  value: number;
}

interface RequestLog {// Tipagem dos tados que vamos receber
  sender_keyFree: string;
  keyFree: string;
  message: string;
  value: number;
}

class TransactionsService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({
    sender_id,
    keyFree,
    password,
    value,
  }: Request): Promise<Accont> {
    const accontRepository = getRepository(Accont);

    const accontExistsSender_id = await accontRepository.findOne({
      where: { id: sender_id },
    });

    const accontExistsfreeKey = await accontRepository.findOne({
      where: { keyFree },
    });

    if (!accontExistsSender_id) {
      throw new AppError(`Accont do not Exist sender_id=${sender_id}`, 400);
    }

    if (!accontExistsfreeKey) {
      throw new AppError(`Accont do not Exist keyFree=${keyFree}`, 400);
    }
    const passwordMatched = await compare(password, accontExistsSender_id.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (value <= 0) {
      throw new AppError('You do not Deposity <= 0', 401);
    }

    if (Number(accontExistsSender_id.balance) <= value) {
      throw new AppError('You do not have is value', 401);
    }

    if (accontExistsSender_id.keyFree === accontExistsfreeKey.keyFree) {
      throw new AppError('You do not send for you', 401);
    }

    let balanceSender = (Number(accontExistsSender_id.balance));
    let balanceAdress = (Number(accontExistsfreeKey.balance));

    if (balanceAdress === 0) {
      balanceSender -= value;
      balanceAdress = value;
    } else {
      balanceSender -= value;
      balanceAdress += value;
    }

    accontExistsSender_id.balance = balanceSender.toString();
    accontExistsfreeKey.balance = balanceAdress.toString();

    await accontRepository.save(accontExistsSender_id);
    await accontRepository.save(accontExistsfreeKey);

    return accontExistsSender_id;
  }

  async log({
    sender_keyFree,
    keyFree,
    message,
    value,
  }: RequestLog): Promise<Transactions> {
    const transactionsRepository = getRepository(Transactions);

    const transaction = transactionsRepository.create({
      sender_keyFree,
      addressee_keyFree: keyFree,
      message,
      value: value.toString(),
    });

    transactionsRepository.save(transaction);

    return transaction;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async listAllTransactions() {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const checkFreeKeyExists = await transactionsRepository.find();

    if (checkFreeKeyExists) {
      return checkFreeKeyExists;
    }
    throw new AppError('Nothing acconts here', 400);
  }
}

export default TransactionsService;
