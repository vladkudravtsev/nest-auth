import { config } from 'dotenv';
import { validate } from 'src/config/env.validation';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: '.env' });

const envVariables = validate(process.env);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envVariables.DATABASE_HOST,
  port: envVariables.DATABASE_PORT,
  username: envVariables.DATABASE_USER,
  password: envVariables.DATABASE_PASSWORD,
  database: envVariables.DATABASE_NAME,
  entities: ['src/db/entities/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
  migrationsRun: false,
};

export const dataSource = new DataSource(dataSourceOptions);
