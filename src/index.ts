import 'reflect-metadata';
import { AppDataSource } from '../data-source'; // ajuste o caminho conforme necessário
import express from 'express';
import productRoute from './adapters/in/api/routes/productRouter';

const app = express();

app.use(express.json(), productRoute);

AppDataSource.initialize()
   .then(() => {
      app.listen(process.env.APP_PORT || 3000, () => {
         console.log(
            `Server is running on port ${process.env.APP_PORT || 3000}`
         );
      });
   })
   .catch((error) => console.log(error));
