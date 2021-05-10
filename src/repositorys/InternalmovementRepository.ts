import { EntityRepository, Repository } from 'typeorm';
import Internalmovement from '../models/Internalmovement';

@EntityRepository(Internalmovement)
class UserRepository extends Repository<Internalmovement> {
  // Extentendo o ropository e usando a tipagem

  public async findByDate(date: Date): Promise<Internalmovement | null> {
    const findAppointment = await this.findOne({
      where: { date }, // ou date: date
    });

    return findAppointment || null;
  }
}

export default UserRepository;
