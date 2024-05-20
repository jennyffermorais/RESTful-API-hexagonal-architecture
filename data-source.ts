import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from './src/domain/model/Product';

dotenv.config();

export const AppDataSource = new DataSource({
   type: 'mysql',
   host: process.env.MYSQL_HOST || 'localhost',
   port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
   username: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   entities: [Product],
   migrations: ['src/migration/**/*.ts'],
   synchronize: true,
});
