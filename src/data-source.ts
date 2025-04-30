// src/data-source.ts
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './entities/user.entity';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Department, SubDepartment],
  migrations: [],
  subscribers: [],
});