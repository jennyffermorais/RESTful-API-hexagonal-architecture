import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { connectServer } from './config/data-source';
import productRoute from './routers/productRoute';
import categoryRoute from './routers/categoryRoute';

/**
 * Cria a aplicação
 */
export const app = express();

/**
 * Libera o acesso aos serviços
 */
app.use(cors());

/**
 * Permite receber e enviar JSON
 */
app.use(bodyParser.json());

/**
 * Configura os logs
 */
app.use(logger('dev'));

/**
 * Conecta no BD
 */
connectServer();

/**
 * Configuração de rotas
 */

app.use(express.json(), productRoute, categoryRoute);
