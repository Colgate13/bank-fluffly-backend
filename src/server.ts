import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';// PRECISA FICAR LOGO ABAIXO DO EXPRESS

import cors from 'cors';
import routes from './routes/index';
import AppError from './errors/AppError';
import './database';

const PORT = process.env.PORT || 3131;
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  // SE O ERRO FOR CONHECIDO, OU SEJA FOI USADO O AppError, ele retorna a mensagem
  // Passada no AppError e o statusCode
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Se a mensagem não for conhecida, ou seja, não usamos o AppError, ele retorna Erro internal
  // statusCode 500
  return err;
});

app.listen(PORT, () => console.log(`🐱‍👤> Server running! 🧛‍♀️ ${PORT}`));
