import { getCustomRepository, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';
import Accont from '../models/Accont';
import AccontRepository from '../repositorys/AccontRepository';

import AppError from '../errors/AppError';

interface Request {// Tipagem dos tados que vamos receber
  idUser: string;
  interKey: string;
  keyFree: string;
  password: string;
}

class CreateUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({
    idUser, interKey, keyFree, password,
  }: Request): Promise<Accont> {
    const accontRepository = getRepository(Accont);

    const checkAccontExists = await accontRepository.findOne({
      where: { id: idUser },
    });

    const checkKeyFreeExists = await accontRepository.findOne({
      where: { interKey },
    });
    if (checkAccontExists) {
      throw new AppError('Accont Exist', 400);
    }

    if (checkKeyFreeExists) {
      throw new AppError('KeyFree Exist', 400);
    }

    const hashedPassword = await hash(password, 8);

    const hashedInterKey = await hash(interKey, 2);

    const accont = accontRepository.create({
      id: idUser,
      accont_id: uuid(),
      interKey: hashedInterKey,
      keyFree,
      password: hashedPassword,
      balance: '0',
    });

    await accontRepository.save(accont);

    return accont;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findBykeyFree(keyFree: string) {
    const usersRepository = getRepository(Accont);

    const checkFreeKeyExists = await usersRepository.findOne({
      where: { keyFree },
    });

    if (checkFreeKeyExists) {
      return checkFreeKeyExists;
    }
    throw new AppError('User email dont exist');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async listAllAcconts() {
    const accontRepository = getCustomRepository(AccontRepository);

    const checkFreeKeyExists = await accontRepository.find();

    if (checkFreeKeyExists) {
      return checkFreeKeyExists;
    }
    throw new AppError('Nothing acconts here', 400);
  }
}

export default CreateUserService;
