import {
  Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import User from './User';

// KISS -> Keep It Simple & Stupid

@Entity('acconts')
class Acconts {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id' })
  id_: User

  @PrimaryColumn('uuid')
  accont_id: string;

  @Column()
  interKey: string;

  @Column()
  keyFree: string;

  @Column()
  password: string;

  @Column()
  balance: string;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: Date;
}

export default Acconts;
