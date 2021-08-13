import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import AppError from '../errors/AppError';
import User from '../models/User';
import LogAccontService from './LogAccontService';

interface Request {// Tipagem dos tados que vamos receber
  id: string;
  password: string;
  value: number;
}

class AccontService {
  // eslint-disable-next-line class-methods-use-this
  public async deposity({
    id, password, value,
  }: Request): Promise<User> {
    const accontRepository = getRepository(User);

    const accontExists = await accontRepository.findOne({
      where: { id },
    });

    if (!accontExists) {
      throw new AppError('Accont do not Exist', 400);
    }

    const passwordMatched = await compare(password, accontExists.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (value <= 0) {
      throw new AppError('You do not Deposity <= 0', 401);
    }

    const balance = (Number(accontExists.balance) + value);
    accontExists.balance = balance.toString();

    await accontRepository.save(accontExists);

    accontExists.password = 'null';
    accontExists.key_free = 'null';

    const logAccontService = new LogAccontService();

    await logAccontService.execute({
      accont_id: accontExists.id,
      type: true,
      value: value.toString(),
    });

    return accontExists;
  }

  public async withdraw({
    id, password, value,
  }: Request): Promise<User> {
    const accontRepository = getRepository(User);

    const accontExists = await accontRepository.findOne({
      where: { id },
    });

    if (!accontExists) {
      throw new AppError('Accont do not Exist', 400);
    }

    const passwordMatched = await compare(password, accontExists.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password combination.', 401);
    }

    if (value <= 0) {
      throw new AppError('You do not Withdraw <= 0', 401);
    }
    let balance = Number(accontExists.balance);

    if (value > balance) {
      throw new AppError(`You do not have  ${value}`, 401);
    }
    balance -= value;
    accontExists.balance = balance.toString();

    await accontRepository.save(accontExists);

    accontExists.password = 'null';
    accontExists.key_free = 'null';

    const logAccontService = new LogAccontService();

    await logAccontService.execute({
      accont_id: accontExists.id,
      type: false,
      value: value.toString(),
    });

    return accontExists;
  }
}

export default AccontService;
