import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import clientRoute from './routers/clientRoute';
import categoryRoute from "./routers/categoryRoute";
import productRoute from './routers/productRoute';
import orderRoute from './routers/orderRoute';
import { paymentRoute } from './routers/paymentRoute';
import swaggerUi from "swagger-ui-express";
import path from 'path';
import swaggerDocument from "../dist/swagger.json"

const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(cors.default());
    app.use(bodyParser.json());
    app.use(logger.default('dev'));
    app.use(express.json(), categoryRoute, clientRoute, productRoute, paymentRoute, orderRoute);

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    app.listen(process.env.APP_PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.APP_PORT || 3000}`);
    });
  })
  .catch((error) => console.log(error));
