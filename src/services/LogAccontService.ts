import { getRepository } from 'typeorm';

import { uuid } from 'uuidv4';

import LogTrade from '../models/Internalmovement';

interface Request {// Tipagem dos tados que vamos receber
  accont_id: string;
  type: boolean;
  value: string;
}

class LogAccontService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({
    accont_id, type, value,
  }: Request): Promise<LogTrade> {
    const logAccontRepository = getRepository(LogTrade);

    const log = logAccontRepository.create({
      id: uuid(),
      value,
      accont_id,
      type,
    });

    logAccontRepository.save(log);

    return log;
  }
}

export default LogAccontService;
