import { getCustomRepository, getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import Accont from '../models/Accont';
import AppError from '../errors/AppError';
import InternalmovementRepository from '../repositorys/InternalmovementRepository';

interface Request {// Tipagem dos tados que vamos receber
  id: string;
  password: string;
  value: number;
}

class AccontService {
  // eslint-disable-next-line class-methods-use-this
  public async deposity({
    id, password, value,
  }: Request): Promise<Accont> {
    const accontRepository = getRepository(Accont);

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
    accontExists.interKey = 'null';
    accontExists.id = 'null';
    accontExists.keyFree = 'null';

    return accontExists;
  }

  public async withdraw({
    id, password, value,
  }: Request): Promise<Accont> {
    const accontRepository = getRepository(Accont);

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
    accontExists.interKey = 'null';
    accontExists.id = 'null';
    accontExists.keyFree = 'null';

    return accontExists;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async listAllAccontsInternalmovement() {
    const accontRepository = getCustomRepository(InternalmovementRepository);

    const checkFreeKeyExists = await accontRepository.find();

    if (checkFreeKeyExists) {
      return checkFreeKeyExists;
    }
    throw new AppError('Nothing acconts here', 400);
  }
}

export default AccontService;
