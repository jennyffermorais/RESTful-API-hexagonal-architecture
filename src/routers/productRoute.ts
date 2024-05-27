import express, { Router } from 'express';
import { ProductController } from '../adapters/driver/api/controller/ProductController';
import { TypeORMRepository } from '../adapters/driver/api/repository/TypeORMRepository';
import { Product } from '../adapters/driven/repository/Product';
import { AppDataSource } from '../data-source';
import { ProductService } from '../core/applications/services/ProductService';
import { IProductService } from '../core/applications/ports/IProductService';

const productRepository = new TypeORMRepository<Product>(AppDataSource, Product);
const productService: IProductService = new ProductService(productRepository);

const productController = new ProductController(productService);

const router = Router();

router.use(express.json());

router.post('/products', (req, res) => productController.createProduct(req, res));
router.put('/products/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));
router.get('/products/:id', (req, res) => productController.getProductById(req, res));
router.get('/products', (req, res) => productController.getAllProducts(req, res));

export default router;
