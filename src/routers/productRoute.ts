import express from 'express';
import { ProductController } from '../adapters/in/api/controller/ProductController';

import { Router } from 'express';

const productController = new ProductController();

const router = Router();

router.use(express.json());

router.post('/products', (req, res) => productController.createProduct(req, res));
router.put('/products/:id', (req, res) =>
   productController.updateProduct(req, res)
);
router.delete('/products/:id', (req, res) =>
   productController.deleteProduct(req, res)
);
router.get('/products/:id', (req, res) =>
   productController.getProductById(req, res)
);
router.get('/products', (req, res) => productController.getAllProducts(req, res));


// module.exports = router;

export default router;
