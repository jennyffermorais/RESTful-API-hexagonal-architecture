import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from './src/domain/model/Product';
import { Client } from './src/domain/model/Client';

dotenv.config();

const port = process.env.MYSQL_PORT as number | undefined

export const AppDataSource = new DataSource({
   type: 'mysql',
   host: process.env.MYSQL_HOST || 'localhost',
   port: port || 3306,
   username: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   entities: [`${__dirname}/**/model/*.{ts,js}`],
   migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
   synchronize: true,
});
