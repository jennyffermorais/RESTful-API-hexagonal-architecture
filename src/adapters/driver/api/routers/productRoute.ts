import { Router } from 'express';
import { IProductService } from '../../../../core/applications/ports/services/IProductService';
import { ProductService } from '../../../../core/applications/services/ProductService';
import { AppDataSource } from '../../../../data-source';
import { ProductController } from '../controller/ProductController';
import { ProductRepository } from '../repository/ProductRepository';

const productRepository = new ProductRepository(AppDataSource);
const productService: IProductService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = Router();
router.post('/products', (req, res) => productController.createProduct(req, res));
router.put('/products/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));
router.get('/products/:id', (req, res) => productController.getProductById(req, res));
router.get('/products', (req, res) => productController.getAllProducts(req, res));

export default router;
