import { EntityRepository, Repository } from 'typeorm';
import Transactions from '../models/Transactions';

@EntityRepository(Transactions)
class UserRepository extends Repository<Transactions> {
  // Extentendo o ropository e usando a tipagem

  public async findByDate(date: Date): Promise<Transactions | null> {
    const findAppointment = await this.findOne({
      where: { date }, // ou date: date
    });

    return findAppointment || null;
  }
}

export default UserRepository;
