import { Router } from 'express';
import { IProductService } from '../../../../core/applications/ports/IProductService';
import { ProductService } from '../../../../core/applications/services/ProductService';
import { AppDataSource } from '../../../../data-source';
import { Product } from '../../../driven/repository/Product';
import { ProductController } from '../controller/ProductController';
import { TypeORMRepository } from '../repository/TypeORMRepository';

const productRepository = new TypeORMRepository<Product>(AppDataSource, Product);
const productService: IProductService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = Router();
router.post('/products', (req, res) => productController.createProduct(req, res));
router.put('/products/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));
router.get('/products/:id', (req, res) => productController.getProductById(req, res));
router.get('/products', (req, res) => productController.getAllProducts(req, res)); // TODO: buscar produto por categoria

export default router;
