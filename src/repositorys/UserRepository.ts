import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  // Extentendo o ropository e usando a tipagem

  public async findByDate(date: Date): Promise<User | null> {
    const findAppointment = await this.findOne({
      where: { date }, // ou date: date
    });

    return findAppointment || null;
  }
}

export default UserRepository;
