import {
  Entity, Column, PrimaryColumn, CreateDateColumn,
} from 'typeorm';

// KISS -> Keep It Simple & Stupid

@Entity('transactions')
class Transactions {
  @PrimaryColumn()
  sender_keyFree: string;

  @PrimaryColumn()
  addressee_keyFree: string;

  @PrimaryColumn()
  id: string;

  @Column()
  value: string;

  @Column()
  message: string;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;
}

export default Transactions;
