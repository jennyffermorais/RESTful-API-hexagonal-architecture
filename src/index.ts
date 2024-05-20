import 'reflect-metadata';
import { AppDataSource } from '../data-source'; // ajuste o caminho conforme necessário
import express from 'express';
import { ProductController } from './adapters/in/api/controller/ProductController';

const app = express();
const productController = new ProductController();

app.use(express.json());

app.post('/products', (req, res) => productController.createProduct(req, res));
app.put('/products/:id', (req, res) =>
   productController.updateProduct(req, res)
);
app.delete('/products/:id', (req, res) =>
   productController.deleteProduct(req, res)
);
app.get('/products/:id', (req, res) =>
   productController.getProductById(req, res)
);
app.get('/products', (req, res) => productController.getAllProducts(req, res));

AppDataSource.initialize()
   .then(() => {
      app.listen(process.env.APP_PORT || 3000, () => {
         console.log(
            `Server is running on port ${process.env.APP_PORT || 3000}`
         );
      });
   })
   .catch((error) => console.log(error));
