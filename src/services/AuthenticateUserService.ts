import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password -> Senha com HASH, criptografada
    // password -> Senha sem HASH, nao criptografada
    // compare -> Compara se a user.passoword == password
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    // Primeiro parametro -> Paylod = Uma informação que vai ficar dentro do token, informações
    // Que podemos precisar usar no frontend ou etc, tipo a permissão do user ou etc

    // Segundo parametro -> Chave Segreta , podemos passar strings, podemos pegar um texto e
    // Cripitografar, tipo bcrypt, md5, sha, e dps passar ali dentro

    // Terceito parametro -> Configurações do token

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ }, secret, {
      subject: user.id, // subject vai disser de qual usuario é o token
      expiresIn,
      // Quando tempo o token vai durar, podemos colocar quantos dias quisermos
    });
    // Usuario autenticado

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
