import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.MYSQL_PORT as unknown as number | undefined

const config: ConnectionOptions = {
   type: 'mysql',
   host: 'localhost',
   port: port,
   username: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   entities: ['src/domain/model/*.ts'],
   migrations: ['src/migration/**/*.ts'],
   synchronize: true,
   logging: true,
};

export default config;
