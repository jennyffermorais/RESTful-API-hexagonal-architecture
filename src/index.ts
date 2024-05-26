import 'reflect-metadata';
import { AppDataSource } from '../data-source'; // ajuste o caminho conforme necessário
import express from 'express';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import productRoute from './routers/productRoute';
import clientRoute from './routers/clientRoute';

const app = express();
app.use(cors.default());
app.use(bodyParser.json());
app.use(logger.default('dev'));

AppDataSource.initialize()
   .then(() => {
      app.listen(process.env.APP_PORT || 3000, () => {
         console.log(
            `Server is running on port ${process.env.APP_} ${process.env.APP_PORT || 3000}`
         );
      });
   })
   .catch((error) => console.log(error));

app.use(express.json(), clientRoute, productRoute);