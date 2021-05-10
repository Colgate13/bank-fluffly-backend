import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('TOKEN IS MISSING', 403);
  }

  // Bearer lkjadlgkjdlfgkjçsdlkfgjdlkjfgçsldkjfgçlksdjfgçlksjdfçglkjsdfgçlkjsdçfgkj
  // [, token] -> Quer fizer que eu não quero os primeiro elementro, quero somente o segundo
  const [, token] = authHeader.split(' ');

  try {
    const decoder = verify(token, authConfig.jwt.secret);

    const { sub } = decoder as TokenPayload;// Forcnado o decoder ter as tipagens do TokenPayLoad

    request.user = {
      id: sub,
    };

    return next();// Com esse comando vamos passar o ID para todas as rotas, assim podemos mostrar
    // Conteudo personalizado, limitado ou algo assim para casa user, deixei um
    // console.log(request.user) Na rota de listagem, olha e testa la
  } catch {
    throw new AppError('Invalid JWT token', 403);
  }
}
