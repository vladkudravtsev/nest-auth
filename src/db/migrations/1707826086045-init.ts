import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1707826086045 implements MigrationInterface {
  name = 'Init1707826086045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "identity" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_feed62e99fa47b221331fa53069" UNIQUE ("identity"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "app" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_f36adbb7b096ceeb6f3e80ad14c" UNIQUE ("name"),
                CONSTRAINT "PK_9478629fc093d229df09e560aea" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "app"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
