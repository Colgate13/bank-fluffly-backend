import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreteTransactions1620520031705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sender_keyFree',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'addressee_keyFree',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'message',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
