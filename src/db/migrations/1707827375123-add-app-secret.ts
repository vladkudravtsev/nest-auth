import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAppSecret1707827375123 implements MigrationInterface {
  name = 'AddAppSecret1707827375123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "app"
            ADD "secret" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "app" DROP COLUMN "secret"
        `);
  }
}
