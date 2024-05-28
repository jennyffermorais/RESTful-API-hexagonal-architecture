import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import express from 'express';
import * as logger from 'morgan';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import clientRoute from './adapters/driver/api/routers/clientRoute';
import orderRoute from './adapters/driver/api/routers/orderRoute';
import { paymentRoute } from './adapters/driver/api/routers/paymentRoute';
import productRoute from './adapters/driver/api/routers/productRoute';
import { AppDataSource } from './data-source';
import swaggerDocument from './swagger/swagger.json';

const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(cors.default());
    app.use(bodyParser.json());
    app.use(logger.default('dev'));
    app.use(express.json(), clientRoute, productRoute, paymentRoute, orderRoute);

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(process.env.APP_PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.APP_PORT || 3000}`);
    });
  })
  .catch((error) => console.log(error));
