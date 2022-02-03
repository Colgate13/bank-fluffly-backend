import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { uuid } from 'uuidv4';
import AppError from '../errors/AppError';

import Transactions from '../models/Transactions';
import User from '../models/User';

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
  }: Request): Promise<User> {
    const accontRepository = getRepository(User);

    const accontExistsSender_id = await accontRepository.findOne({
      where: { id: sender_id },
    });

    const accontExistsfreeKey = await accontRepository.findOne({
      where: { key_free: keyFree },
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

    if (accontExistsSender_id.key_free === accontExistsfreeKey.key_free) {
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
      id: uuid(),
      sender_keyFree,
      addressee_keyFree: keyFree,
      message,
      value: value.toString(),
    });

    transactionsRepository.save(transaction);

    return transaction;
  }

  // eslint-disable-next-line class-methods-use-this
  public async search(
    accont_id
      : string): Promise<any> {

    const userAccontRepository = getRepository(User);

    const user = await userAccontRepository.findOne({
      where: { id: accont_id },
    });

    if (!user) {
      throw new AppError('User dont exist');
    }

    const logAccontRepository = getRepository(Transactions);

    const dataSend = await logAccontRepository.find({
      where: [
        { sender_keyFree: user.key_free },
        { addressee_keyFree: user.key_free },
      ],
    });

    if (!dataSend) {
      throw new AppError('dont exist transactions');
    }

    var obj: any = {};

    dataSend.forEach(log => {
      obj[log.id] = log;
    });

    return obj;
  }
}

export default TransactionsService;
