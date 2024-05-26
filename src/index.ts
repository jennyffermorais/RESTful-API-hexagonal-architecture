import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from '../data-source'; // ajuste o caminho conforme necessário
import clientRoute from './routers/clientRoute';
import { paymentRoute } from './routers/paymentRoute';
import productRoute from './routers/productRoute';

const app = express();

app.use(express.json(), clientRoute, productRoute, paymentRoute);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.APP_PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.APP_PORT || 3000}`);
    });
  })
  .catch((error) => console.log(error));
