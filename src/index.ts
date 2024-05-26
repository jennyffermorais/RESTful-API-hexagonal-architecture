import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import express from 'express';
import * as logger from 'morgan';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import clientRoute from './routers/clientRoute';
import { paymentRoute } from './routers/paymentRoute';
import productRoute from './routers/productRoute';

const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(cors.default());
    app.use(bodyParser.json());
    app.use(logger.default('dev'));
    app.use(express.json(), clientRoute, productRoute, paymentRoute);
    app.use('/', (req, res) => res.send('restfull-api-hexagonal-architecture ok'));

    app.listen(process.env.APP_PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.APP_PORT || 3000}`);
    });
  })
  .catch((error) => console.log(error));
