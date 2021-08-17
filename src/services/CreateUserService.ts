import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {// Tipagem dos tados que vamos receber
  name: string;
  email: string;
  password: string;
  keyFree: string;
}

class CreateUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({
    name, email, password, keyFree,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);
try{
  
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
}catch(err){
  console.log(err);
}
    if (checkUserExists) {
      throw new AppError('Email address alredy used!', 400);
    }

    const checkKeyFreeExists = await usersRepository.findOne({
      where: { key_free: keyFree },
    });

    if (checkKeyFreeExists) {
      throw new AppError('KeyFree address alredy used!', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      id: uuid(),
      password: hashedPassword,
      key_free: keyFree,
      balance: '0',
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
}

export default CreateUserService;
