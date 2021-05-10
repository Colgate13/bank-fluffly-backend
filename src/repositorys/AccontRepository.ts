import { EntityRepository, Repository } from 'typeorm';
import Accont from '../models/Accont';

@EntityRepository(Accont)
class UserRepository extends Repository<Accont> {
  // Extentendo o ropository e usando a tipagem

  public async findByDate(date: Date): Promise<Accont | null> {
    const findAcconts = await this.findOne({
      where: { date }, // ou date: date
    });

    return findAcconts || null;
  }
}

export default UserRepository;
