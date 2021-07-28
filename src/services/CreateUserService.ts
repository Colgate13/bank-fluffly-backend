import { getRepository, getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UserRepository from '../repositorys/UserRepository';

import AppError from '../errors/AppError';

interface Request {// Tipagem dos tados que vamos receber
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address alredy used!', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    const checkCreated = await usersRepository.findOne({
      where: { email },
    });

    if (checkCreated) {
      // REMOVENDO PASSWORD NA CRIACAO DO USER
      try {
        checkCreated.password = 'Nothing Here';
      } catch (error) {
        throw new AppError('Password return dont delete', 400);
      }

      return checkCreated;
    }
    throw new Error('User email dont exist');
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
}

export default CreateUserService;
