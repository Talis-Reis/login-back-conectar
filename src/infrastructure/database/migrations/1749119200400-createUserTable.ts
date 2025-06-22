import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTable1749119200400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            primaryKeyConstraintName: 'pk_users_id',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'roles',
            type: 'text',
            isArray: true,
            default: `'{}'`,
          },
          {
            name: 'firstAccess',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'lastAccess',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true, true, true)
  }
}
