import { DataSource } from 'typeorm';
import { File } from './historical-files/domain/entities/file.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: 'neptune',
  entities: [File],
  migrations: ['dist/migrations/**/*.js'],
  synchronize: false,
});
