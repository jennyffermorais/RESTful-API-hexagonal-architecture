import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './domain/model/Product';
import { Category } from './domain/model/Category';

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'api-typescript',
   synchronize: true,
   dropSchema: true, // remover todas as tabelas e recriar
   logging: false,
   entities: [Product, Category],
   migrations: [],
   subscribers: [],
});

export async function connectServer() {
   try {
      await AppDataSource.initialize();
      console.log(
         `App connected to database ${AppDataSource.options.database}`
      );

   } catch (error) {
      console.error('Error with the connection to the database:', error);
   } finally {

     //await AppDataSource.destroy();
     //console.log('Connection to the database closed');
   }
}