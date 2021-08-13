import { getRepository, getCustomRepository } from 'typeorm';
import User from '../models/User';
import UserRepository from '../repositorys/UserRepository';

import AppError from '../errors/AppError';
import InternalmovementRepository from '../repositorys/InternalmovementRepository';

class AccontUserService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findAccontId(id: string) {
    const usersRepository = getRepository(User);

    const checkFreeKeyExists = await usersRepository.findOne({
      where: { id },
    });

    if (checkFreeKeyExists) {
      return checkFreeKeyExists;
    }
    throw new AppError('User email dont exist');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findAccontKeyFree(keyFree: string) {
    const usersRepository = getRepository(User);

    const checkFreeKeyExists = await usersRepository.findOne({
      where: { key_free: keyFree },
    });

    if (checkFreeKeyExists) {
      return checkFreeKeyExists;
    }
    throw new AppError('User email dont exist');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findByEmail(email: string) {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      return checkUserExists;
    }
    throw new AppError('User email dont exist');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async listAllAcconts() {
    const usersRepository = getCustomRepository(UserRepository);

    const checkFreeKeyExists = await usersRepository.find();

    if (checkFreeKeyExists) {
      return checkFreeKeyExists;
    }
    throw new AppError('Nothing users here');
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

export default AccontUserService;
