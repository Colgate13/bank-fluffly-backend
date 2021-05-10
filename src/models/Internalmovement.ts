import {
  Entity, Column, PrimaryColumn, CreateDateColumn,
} from 'typeorm';

// KISS -> Keep It Simple & Stupid

@Entity('internalmovement')
class LogTrade {
  @PrimaryColumn('uuid')
  id: string;

  @PrimaryColumn('uuid')
  @Column()
  accont_id: string;

  @Column()
  type: boolean;

  @Column()
  value: string;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;
}

export default LogTrade;
